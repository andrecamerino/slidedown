"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { OutputFormat, ConvertResponse } from "@/types";

export default function ConvertPage() {
  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState<string>("");
  const [slideCount, setSlideCount] = useState<number | undefined>();
  const [format, setFormat] = useState<OutputFormat>("markdown");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "pptx", "ppt"].includes(ext ?? "")) {
      setError("Please upload a PDF or PowerPoint file.");
      return;
    }
    setFile(f);
    setOutput("");
    setError("");
  }, []);

  const convert = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setOutput("");

    const form = new FormData();
    form.append("file", file);
    form.append("format", format);

    try {
      const res = await fetch("/api/convert", { method: "POST", body: form });
      const data: ConvertResponse = await res.json();
      if (data.success && data.output) {
        setOutput(data.output);
        setSlideCount(data.slideCount);
      } else {
        setError(data.error ?? "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0f]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-7 py-4 border-b border-white/[0.07] bg-[#0c0c0f]/95 sticky top-0 z-50 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 text-[15px] font-medium text-white">
          <div className="w-[22px] h-[22px] rounded-[6px] flex items-center justify-center" style={{background:"linear-gradient(135deg,#7F77DD,#AFA9EC)"}}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 3h8M2 6h6M2 9h4" />
            </svg>
          </div>
          slidedown
        </Link>
        <span className="text-[12px] text-white/35">convert another file</span>
      </nav>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-5 py-2.5 border-b border-white/[0.06] bg-[#0e0e12]">
        {(["markdown", "plaintext"] as OutputFormat[]).map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`text-[12px] px-3 py-1.5 rounded-lg border transition-all ${format === f ? "bg-[rgba(127,119,221,0.15)] border-[rgba(127,119,221,0.4)] text-[#AFA9EC]" : "border-white/10 text-white/40 bg-transparent hover:text-white/60"}`}
          >
            {f}
          </button>
        ))}
        {slideCount !== undefined && (
          <span className="ml-auto text-[12px] text-white/25">{slideCount} slides</span>
        )}
      </div>

      {/* Split pane */}
      <div className="grid grid-cols-2 divide-x divide-white/[0.06] min-h-[calc(100vh-120px)]">
        {/* Left — input */}
        <div className="p-4">
          <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-white/30 mb-3">input</p>

          {!file ? (
            <div
              className={`upload-zone border-[1.5px] border-dashed border-[rgba(127,119,221,0.28)] rounded-xl p-8 text-center bg-[rgba(127,119,221,0.04)] cursor-pointer ${isDragging ? "border-[rgba(127,119,221,0.6)]" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              onClick={() => inputRef.current?.click()}
            >
              <p className="text-[13px] font-medium text-white mb-1">drop your file here</p>
              <p className="text-[12px] text-white/35">or <span className="text-[#AFA9EC]">browse to upload</span></p>
              <input ref={inputRef} type="file" accept=".pdf,.pptx,.ppt" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2.5 bg-[#141418] border border-white/[0.07] rounded-lg px-3 py-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[rgba(127,119,221,0.15)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center text-[10px] font-medium text-[#AFA9EC] shrink-0">
                  {file.name.split(".").pop()?.toUpperCase()}
                </div>
                <div>
                  <p className="text-[12px] font-medium text-white">{file.name}</p>
                  <p className="text-[11px] text-white/30">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>

              {error && <p className="text-[12px] text-red-400 mb-3">{error}</p>}

              <button
                onClick={convert}
                disabled={loading}
                className="btn-glow w-full text-[13px] font-medium py-2.5 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{background:"linear-gradient(135deg,#534AB7,#7F77DD)"}}
              >
                {loading ? "converting..." : "convert"}
              </button>

              {output && <p className="text-[11px] text-[#5DCAA5] mt-2.5">converted successfully</p>}

              <button
                onClick={() => { setFile(null); setOutput(""); setError(""); }}
                className="text-[12px] text-white/30 hover:text-white/50 mt-3 transition-colors"
              >
                upload different file
              </button>
            </div>
          )}
        </div>

        {/* Right — output */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-white/30">output</p>
            {output && (
              <button
                onClick={copyAll}
                className="text-[11px] px-2.5 py-1 rounded-md bg-[rgba(127,119,221,0.2)] border border-[rgba(127,119,221,0.35)] text-[#AFA9EC] transition-all hover:bg-[rgba(127,119,221,0.3)]"
              >
                {copied ? "copied!" : "copy all"}
              </button>
            )}
          </div>

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
    </div>
  );
}
