"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { setPendingFile } from "@/lib/pendingFile";

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFile = useCallback(
    (file: File) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!["pdf", "pptx", "ppt"].includes(ext ?? "")) {
        alert("Please upload a PDF or PowerPoint file.");
        return;
      }
      setPendingFile(file);
      router.push("/convert");
    },
    [router]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      className={`upload-zone mx-6 mb-9 border-[1.5px] border-dashed border-[rgba(127,119,221,0.28)] rounded-2xl p-8 text-center bg-[rgba(127,119,221,0.04)] relative overflow-hidden cursor-pointer ${isDragging ? "border-[rgba(127,119,221,0.6)] bg-[rgba(127,119,221,0.1)]" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(127,119,221,0.10) 0%, transparent 70%)" }} />

      <div className="w-10 h-10 rounded-[10px] border border-white/10 bg-white/[0.05] flex items-center justify-center mx-auto mb-3">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M9 2v10M5 6l4-4 4 4M3 14h12" />
        </svg>
      </div>

      <p className="text-[14px] font-medium text-white mb-1">drop your file here</p>
      <p className="text-[12px] text-white/32 mb-4">
        or <span className="text-[#AFA9EC]">browse to upload</span> — PDF or PowerPoint, up to 50MB
      </p>

      <div className="flex gap-1.5 justify-center flex-wrap">
        {["PDF", "PPTX", "up to 50MB", "completely free"].map((t) => (
          <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-full border border-white/[0.09] text-white/32 bg-white/[0.04]">
            {t}
          </span>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.pptx,.ppt"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}
