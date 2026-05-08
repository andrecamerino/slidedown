"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { OutputFormat } from "@/types";
import { CONTENT } from "@/lib/constants";
import { consumePendingFiles } from "@/lib/pendingFile";
import { markdownToPlainText } from "@/lib/markdownToPlainText";
import { useConversion } from "@/lib/conversionContext";
import { FeedbackModal } from "@/components/feedback/FeedbackModal";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

interface ConversionStats {
  pages: number;
  originalBytes: number;
  outputBytes: number;
  wordCount: number;
  reductionPct: number;
  fileType: "pdf" | "pptx" | "mixed";
}

export default function ConvertPage() {
  const { setHasOutput } = useConversion();
  const [files, setFiles] = useState<File[]>(() => consumePendingFiles());
  const [output, setOutput] = useState<string>("");
  const [format, setFormat] = useState<OutputFormat>("markdown");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [conversionStats, setConversionStats] = useState<ConversionStats | null>(null);
  const [convertEachHinted, setConvertEachHinted] = useState(false);
  const [showFeedbackNudge, setShowFeedbackNudge] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const nudgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasOutput(output.length > 0);
  }, [output, setHasOutput]);

  const FEEDBACK_SESSION_KEY = "slidedown_feedback_nudge_shown";

  const dismissNudge = useCallback(() => {
    setShowFeedbackNudge(false);
    sessionStorage.setItem(FEEDBACK_SESSION_KEY, "1");
    if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
  }, []);

  const triggerFeedbackNudge = useCallback(() => {
    if (sessionStorage.getItem(FEEDBACK_SESSION_KEY)) return;
    nudgeTimerRef.current = setTimeout(() => setShowFeedbackNudge(true), 1500);
  }, []);

  useEffect(() => {
    if (!showFeedbackNudge) return;
    const t = setTimeout(dismissNudge, 8000);
    return () => clearTimeout(t);
  }, [showFeedbackNudge, dismissNudge]);

  useEffect(() => () => { if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current); }, []);

  const handleFile = useCallback((f: File) => {
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "pptx", "ppt"].includes(ext ?? "")) {
      setError("Please upload a PDF or PowerPoint file.");
      return;
    }
    setFiles((prev) => [...prev, f]);
    setOutput("");
    setError("");
    setProgress(null);
    setConversionStats(null);
  }, []);

  const handleFileList = useCallback((list: FileList) => {
    Array.from(list).forEach(handleFile);
  }, [handleFile]);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setOutput("");
    setConversionStats(null);
  }, []);

  const mergeAll = async () => {
    if (!files.length) return;
    setLoading(true);
    setError("");
    setOutput("");
    setProgress(null);
    setConversionStats(null);

    try {
      const parts: string[] = [];
      let totalPages = 0;
      let totalOriginalBytes = 0;
      const seenTypes = new Set<"pdf" | "pptx">();

      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        setCurrentFileIndex(i);
        setProgress(null);
        const ext = f.name.split(".").pop()?.toLowerCase();
        let text = "";
        let count = 0;

        if (ext === "pdf") {
          const { parsePDFClient } = await import("@/lib/parsePDFClient");
          const result = await parsePDFClient(f, (current, total) => setProgress({ current, total }));
          text = result.text;
          count = result.pageCount;
          seenTypes.add("pdf");
        } else if (ext === "pptx" || ext === "ppt") {
          const { parsePPTXClient } = await import("@/lib/parsePPTXClient");
          const result = await parsePPTXClient(f, (current, total) => setProgress({ current, total }));
          text = result.text;
          count = result.slideCount;
          seenTypes.add("pptx");
        } else {
          setError(`Unsupported file type: ${f.name}`);
          return;
        }

        parts.push(`# ${f.name}\n\n${text}`);
        totalPages += count;
        totalOriginalBytes += f.size;
      }

      const merged = parts.join("\n\n---\n\n");
      const finalText = format === "plaintext" ? markdownToPlainText(merged) : merged;
      setOutput(finalText);
      setProgress(null);

      const fileType =
        seenTypes.size > 1 ? "mixed" : seenTypes.has("pdf") ? "pdf" : "pptx";
      const outputBytes = new TextEncoder().encode(finalText).length;
      const reductionPct = Math.max(
        0,
        Math.round((1 - outputBytes / totalOriginalBytes) * 100)
      );
      setConversionStats({
        pages: totalPages,
        originalBytes: totalOriginalBytes,
        outputBytes,
        wordCount: finalText.split(/\s+/).filter(Boolean).length,
        reductionPct,
        fileType,
      });
    } catch (err) {
      console.error("[convert]", err);
      setError("Could not convert this file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // TODO: implement convert-each — parse each file individually and provide separate per-file downloads
  const convertEach = () => {
    setConvertEachHinted(true);
    setTimeout(() => setConvertEachHinted(false), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    triggerFeedbackNudge();
  };

  const downloadFile = () => {
    const ext = format === "markdown" ? "md" : "txt";
    const baseName =
      files.length === 1
        ? files[0].name.replace(/\.[^.]+$/, "")
        : "merged";
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    triggerFeedbackNudge();
  };

  const currentFile = files[currentFileIndex];
  const currentExt = currentFile?.name.split(".").pop()?.toLowerCase();

  return (
    <div className="min-h-screen bg-[#0c0c0f]">
      {/* Toolbar */}
      <div className="border-b border-white/[0.06] bg-[#0e0e12]">
        <div className={`${CONTENT} flex items-center gap-2 py-2.5`}>
          {(["markdown", "plaintext"] as OutputFormat[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`text-[12px] px-3 py-1.5 rounded-lg border transition-all ${format === f ? "bg-[rgba(127,119,221,0.15)] border-[rgba(127,119,221,0.4)] text-[#AFA9EC]" : "border-white/10 text-white/40 bg-transparent hover:text-white/60"}`}
            >
              {f}
            </button>
          ))}
          {conversionStats && (
            <span className="ml-auto text-[12px] text-white/25">
              {conversionStats.pages}{" "}
              {conversionStats.fileType === "pdf"
                ? "pages"
                : conversionStats.fileType === "pptx"
                ? "slides"
                : "pages/slides"}
            </span>
          )}
        </div>
      </div>

      {/* Split pane */}
      <div className={`${CONTENT} grid grid-rows-1 lg:grid-cols-2 divide-x divide-white/[0.06] lg:min-h-[calc(100vh-120px)]`}>
        {/* Left — input */}
        <div className="p-4">
          <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-white/30 mb-3">input</p>

          {files.length === 0 ? (
            <div
              className={`upload-zone border-[1.5px] border-dashed border-[rgba(127,119,221,0.28)] rounded-xl p-8 text-center bg-[rgba(127,119,221,0.04)] cursor-pointer ${isDragging ? "border-[rgba(127,119,221,0.6)]" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files.length) handleFileList(e.dataTransfer.files); }}
              onClick={() => inputRef.current?.click()}
            >
              <p className="text-[13px] font-medium text-white mb-1">drop your files here</p>
              <p className="text-[12px] text-white/35">or <span className="text-[#AFA9EC]">browse to upload</span></p>
              <p className="text-[11px] text-white/25 mt-1">PDF or PowerPoint — drop multiple files to merge or convert separately</p>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.pptx,.ppt"
                multiple
                className="hidden"
                onChange={(e) => { if (e.target.files?.length) handleFileList(e.target.files); }}
              />
            </div>
          ) : (
            <div>
              {/* File list */}
              <div className="space-y-2 mb-3 max-h-[35vh] overflow-y-auto">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-[#141418] border border-white/[0.07] rounded-lg px-3 py-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[rgba(127,119,221,0.15)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center text-[10px] font-medium text-[#AFA9EC] shrink-0">
                      {f.name.split(".").pop()?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-white truncate">{f.name}</p>
                      <p className="text-[11px] text-white/30">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      onClick={() => removeFile(i)}
                      className="text-white/20 hover:text-white/50 transition-colors text-[16px] leading-none shrink-0"
                      aria-label="Remove file"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Add more files */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => inputRef.current?.click()}
                  className="text-[12px] text-[#AFA9EC]/60 hover:text-[#AFA9EC] transition-colors"
                >
                  + add more files
                </button>
                {files.length === 1 && (
                  <span className="text-[11px] text-white/20">— add another to get merge options</span>
                )}
              </div>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.pptx,.ppt"
                multiple
                className="hidden"
                onChange={(e) => { if (e.target.files?.length) handleFileList(e.target.files); }}
              />

              {error && <p className="text-[12px] text-red-400 mb-3">{error}</p>}

              {/* Action area */}
              {files.length >= 2 ? (
                <div>
                  <p className="text-[11px] text-white/25 mb-2 tracking-wide">choose how to convert</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {/* Merge all card */}
                    <div className="rounded-xl border border-[rgba(127,119,221,0.3)] bg-[rgba(127,119,221,0.05)] p-3 flex flex-col">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-[#AFA9EC] shrink-0">
                          <path d="M2 3h3.5L8 6.5M2 10h3.5L8 6.5M8 6.5h3" />
                        </svg>
                        <p className="text-[12px] font-medium text-white">Merge all</p>
                      </div>
                      <p className="text-[11px] text-white/40 leading-relaxed mb-3 flex-1">
                        Combine into one file with a section header per source
                      </p>
                      <button
                        onClick={mergeAll}
                        disabled={loading}
                        className={`w-full text-[12px] font-medium py-2 rounded-lg text-white ${loading ? "btn-convert-loading cursor-not-allowed" : "btn-glow btn-convert"}`}
                      >
                        {loading
                          ? `file ${currentFileIndex + 1}/${files.length}…`
                          : "merge & convert"}
                      </button>
                    </div>

                    {/* Convert each card */}
                    {/* TODO: implement convert-each — parse each file individually and provide separate per-file downloads */}
                    <div className="rounded-xl border border-white/[0.07] bg-[#141418] p-3 flex flex-col">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-white/35 shrink-0">
                          <rect x="1.5" y="1.5" width="4" height="5" rx="0.75" />
                          <rect x="7.5" y="1.5" width="4" height="5" rx="0.75" />
                          <rect x="1.5" y="8" width="4" height="4" rx="0.75" />
                          <rect x="7.5" y="8" width="4" height="4" rx="0.75" />
                        </svg>
                        <p className="text-[12px] font-medium text-white/60">Convert each</p>
                        <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-[rgba(93,202,165,0.1)] border border-[rgba(93,202,165,0.2)] text-[#5DCAA5] leading-none">soon</span>
                      </div>
                      <p className="text-[11px] text-white/30 leading-relaxed mb-3 flex-1">
                        Get a separate output for each file to download individually
                      </p>
                      <button
                        onClick={convertEach}
                        className="w-full text-[12px] font-medium py-2 rounded-lg border border-white/[0.08] text-white/35 bg-transparent transition-all hover:text-white/50 hover:border-white/[0.14]"
                      >
                        {convertEachHinted ? "coming soon!" : "convert separately"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={mergeAll}
                  disabled={loading}
                  className={`w-full text-[13px] font-medium py-2.5 rounded-lg text-white mb-3 ${loading ? "btn-convert-loading cursor-not-allowed" : "btn-glow btn-convert"}`}
                >
                  {loading ? "converting..." : "convert"}
                </button>
              )}

              {loading && (
                <p className="text-[11px] text-white/30 mt-2 text-center">
                  {progress
                    ? `${currentExt === "pdf" ? "Page" : "Slide"} ${progress.current} of ${progress.total}…`
                    : "Parsing…"}
                </p>
              )}

              <button
                onClick={() => { setFiles([]); setOutput(""); setError(""); setConversionStats(null); }}
                className="text-[12px] text-white/30 hover:text-white/50 mt-3 transition-colors block"
              >
                clear all
              </button>
            </div>
          )}
        </div>

        {/* Right — output */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-white/30">output</p>
            {output && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={copyAll}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-[rgba(127,119,221,0.2)] border border-[rgba(127,119,221,0.35)] text-[#AFA9EC] transition-all hover:bg-[rgba(127,119,221,0.3)]"
                >
                  {copied ? "copied!" : "copy all"}
                </button>
                <button
                  onClick={downloadFile}
                  className="text-[11px] px-2.5 py-1 rounded-md border border-white/[0.12] text-white/40 bg-transparent transition-all hover:text-white/60 hover:border-white/20"
                >
                  {`download as .${format === "markdown" ? "md" : "txt"}`}
                </button>
              </div>
            )}
          </div>

          {conversionStats && (
            <div className="flex items-center gap-4 mb-3 px-3 py-2.5 rounded-lg bg-[#141418] border border-white/[0.07]">
              <div>
                <p className="text-[14px] font-semibold text-white leading-none">{conversionStats.pages}</p>
                <p className="text-[10px] text-white/35 mt-0.5">
                  {conversionStats.fileType === "pdf"
                    ? "pages"
                    : conversionStats.fileType === "pptx"
                    ? "slides"
                    : "pages/slides"}
                </p>
              </div>
              <div className="w-px h-6 bg-white/[0.08] shrink-0" />
              <div>
                <p className="text-[14px] font-semibold text-[#5DCAA5] leading-none">{conversionStats.reductionPct}% smaller</p>
                <p className="text-[10px] text-white/35 mt-0.5">{formatBytes(conversionStats.originalBytes)} → {formatBytes(conversionStats.outputBytes)}</p>
              </div>
              <div className="w-px h-6 bg-white/[0.08] shrink-0" />
              <div>
                <p className="text-[14px] font-semibold text-white leading-none">{conversionStats.wordCount.toLocaleString()}</p>
                <p className="text-[10px] text-white/35 mt-0.5">words</p>
              </div>
            </div>
          )}

          {output ? (
            <pre className="bg-[#141418] border border-white/[0.07] rounded-xl p-4 font-mono text-[11px] text-white/50 leading-relaxed overflow-auto max-h-[70vh] whitespace-pre-wrap">
              {output}
            </pre>
          ) : (
            <div className="bg-[#111115] border border-white/[0.07] rounded-xl p-4 min-h-[200px] flex items-center justify-center">
              <p className="text-[12px] text-white/20">your converted text will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Feedback nudge toast */}
      <div
        className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${
          showFeedbackNudge
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="relative bg-[#141418] border border-white/[0.1] rounded-xl p-4 shadow-xl w-[220px]">
          <button
            onClick={dismissNudge}
            className="absolute top-2.5 right-2.5 text-white/30 hover:text-white/60 transition-colors text-[15px] leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
          <p className="text-[13px] font-medium text-white mb-1 pr-5">How was your conversion?</p>
          <p className="text-[11px] text-white/40 mb-3">Takes 30 seconds.</p>
          <button
            onClick={() => { setFeedbackOpen(true); dismissNudge(); }}
            className="w-full text-[12px] font-medium py-2 rounded-lg text-white btn-glow btn-convert"
          >
            share feedback
          </button>
        </div>
      </div>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
