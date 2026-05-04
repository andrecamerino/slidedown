"use client";

import { motion } from "motion/react";
import { CONTENT } from "@/lib/constants";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
};

export function Features() {
  return (
    <motion.section id="features" {...fadeUp}>
      <div className={`${CONTENT} pb-8`}>
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#7F77DD] mb-2">features</p>
        <h2 className="text-[22px] font-medium text-white mb-1.5 tracking-[-0.02em] leading-[1.25]">Everything you need for AI-powered study</h2>
        <p className="text-[13px] text-white/38 mb-5 leading-[1.7]">Built by students, for students who want to actually get value out of AI tools.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
          <div className="rounded-xl p-4 relative overflow-hidden border transition-all duration-200 hover:border-[rgba(127,119,221,0.3)] hover:shadow-[0_0_20px_rgba(127,119,221,0.08)] border-[rgba(127,119,221,0.22)] bg-[rgba(127,119,221,0.05)]">
            <div className="absolute top-[-30px] right-[-30px] w-[90px] h-[90px] rounded-full bg-[rgba(127,119,221,0.1)] pointer-events-none" style={{ filter: "blur(25px)" }} />
            <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(127,119,221,0.14)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center mb-2.5">
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="#AFA9EC" strokeWidth="1.5" strokeLinecap="round"><path d="M2 2h11M2 5.5h8M2 9h6M2 12.5h4" /></svg>
            </div>
            <p className="text-[13px] font-medium text-white mb-1">converts slides to readable text</p>
            <p className="text-[12px] text-white/35 leading-[1.6] mb-2">Turns your PDF or PowerPoint into clean text that AI can actually understand and work with.</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(127,119,221,0.13)] text-[#AFA9EC] border border-[rgba(127,119,221,0.22)]">PDF + PowerPoint</span>
          </div>

          <div className="rounded-xl p-4 relative overflow-hidden border transition-all duration-200 hover:border-[rgba(127,119,221,0.3)] hover:shadow-[0_0_20px_rgba(127,119,221,0.08)] border-white/[0.07] bg-[#111115]">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(127,119,221,0.14)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center mb-2.5">
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="#AFA9EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1.5" y="2" width="5" height="6" rx="1" /><rect x="8.5" y="2" width="5" height="6" rx="1" /><path d="M4 11.5h7M7.5 8v3.5" /></svg>
            </div>
            <p className="text-[13px] font-medium text-white mb-1">merge all your lecture files</p>
            <p className="text-[12px] text-white/35 leading-[1.6] mb-2">Combine every week&apos;s slides into one document. Search your entire semester in seconds — great for open-book exams.</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(127,119,221,0.13)] text-[#AFA9EC] border border-[rgba(127,119,221,0.22)]">exam season essential</span>
          </div>

          <div className="rounded-xl p-4 relative overflow-hidden border transition-all duration-200 hover:border-[rgba(127,119,221,0.3)] hover:shadow-[0_0_20px_rgba(127,119,221,0.08)] border-white/[0.07] bg-[#111115]">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(127,119,221,0.14)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center mb-2.5">
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="#AFA9EC" strokeWidth="1.5" strokeLinecap="round"><circle cx="10" cy="5" r="2" /><path d="M3 5h5M3 9h9M3 13h9" /><circle cx="6" cy="9" r="1.5" /></svg>
            </div>
            <p className="text-[13px] font-medium text-white mb-1">pull out your highlights</p>
            <p className="text-[12px] text-white/35 leading-[1.6] mb-2">Already annotated your PDF? Extract only your highlighted text and comments into a clean summary.</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(127,119,221,0.13)] text-[#AFA9EC] border border-[rgba(127,119,221,0.22)]">annotations only</span>
          </div>

          <div className="rounded-xl p-4 relative overflow-hidden border transition-all duration-200 hover:border-[rgba(127,119,221,0.3)] hover:shadow-[0_0_20px_rgba(127,119,221,0.08)] border-white/[0.07] bg-[#111115]">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(127,119,221,0.14)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center mb-2.5">
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="#AFA9EC" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="11" height="11" rx="2" /><path d="M5 7.5h5M7.5 5v5" /></svg>
            </div>
            <p className="text-[13px] font-medium text-white mb-1">works with any AI tool</p>
            <p className="text-[12px] text-white/35 leading-[1.6] mb-2">No lock-in. Copy your text and paste into whichever AI you already use — ChatGPT, Claude, Gemini, anything.</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(127,119,221,0.13)] text-[#AFA9EC] border border-[rgba(127,119,221,0.22)]">one-click copy</span>
          </div>
        </div>

        {/* Merge demo */}
        <div className="bg-[#111115] border border-white/[0.07] rounded-xl p-4 mb-2.5 relative overflow-hidden">
          <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[200px] h-[70px] bg-[rgba(93,202,165,0.08)] pointer-events-none" style={{ filter: "blur(28px)" }} />
          <p className="text-[12px] font-medium text-white mb-3">merge for open-book exams — search your entire semester</p>
          <div className="flex flex-col gap-1.5 mb-3">
            {[
              { type: "PDF", name: "week1_intro.pdf", slides: "18 slides", pdfStyle: true },
              { type: "PPT", name: "week2_data_structures.pptx", slides: "24 slides", pdfStyle: false },
              { type: "PDF", name: "week3_algorithms.pdf", slides: "31 slides", pdfStyle: true },
            ].map((f) => (
              <div key={f.name} className="flex items-center gap-2.5 bg-[#0e0e12] border border-white/[0.06] rounded-[7px] px-2.5 py-[7px]">
                <div className={`text-[10px] font-medium w-[26px] h-[26px] rounded-[6px] flex items-center justify-center flex-shrink-0 ${f.pdfStyle ? "bg-[rgba(232,75,74,0.13)] text-[#F09595] border border-[rgba(232,75,74,0.22)]" : "bg-[rgba(239,159,39,0.13)] text-[#FAC775] border border-[rgba(239,159,39,0.22)]"}`}>{f.type}</div>
                <span className="text-[12px] text-white/65 flex-1">{f.name}</span>
                <span className="text-[11px] text-white/22">{f.slides}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[11px] px-[11px] py-[3px] rounded-full bg-[rgba(93,202,165,0.09)] border border-[rgba(93,202,165,0.22)] text-[#5DCAA5]">merged + converted</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-2.5 bg-[rgba(93,202,165,0.05)] border border-[rgba(93,202,165,0.18)] rounded-lg px-[11px] py-2">
            <div className="w-[26px] h-[26px] rounded-[6px] bg-[rgba(93,202,165,0.13)] flex items-center justify-center flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#5DCAA5" strokeWidth="1.5" strokeLinecap="round"><path d="M2 2h9M2 5h7M2 8h5M2 11h6" /></svg>
            </div>
            <span className="text-[12px] text-[#5DCAA5] flex-1">semester_notes_combined.md</span>
            <span className="text-[11px] text-[rgba(93,202,165,0.45)]">73 slides · Ctrl+F ready</span>
          </div>
        </div>

        {/* Ctrl+F demo */}
        <div className="bg-[#111115] border border-white/[0.07] rounded-xl p-4">
          <p className="text-[12px] font-medium text-white mb-2.5">Ctrl+F your entire semester in one place</p>
          <div className="flex items-center gap-2 bg-[#0c0c0f] border border-[rgba(127,119,221,0.3)] rounded-[7px] px-[11px] py-[7px] mb-3">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" className="flex-shrink-0"><circle cx="5.5" cy="5.5" r="3.5" /><path d="M8.5 8.5l3 3" /></svg>
            <span className="text-[12px] text-[#AFA9EC] flex-1">binary search tree</span>
            <span className="text-[11px] text-white/25">4 of 12 matches</span>
          </div>
          <p className="text-[12px] text-white/38 leading-[1.9]">
            ...week 3 — A <mark className="bg-[rgba(127,119,221,0.28)] text-[#AFA9EC] rounded-[2px] px-0.5 not-italic">binary search tree</mark> is a node-based structure where...<br />
            ...week 5 — inserting into a <mark className="bg-[rgba(127,119,221,0.28)] text-[#AFA9EC] rounded-[2px] px-0.5 not-italic">binary search tree</mark> requires comparing...<br />
            ...week 8 — balanced <mark className="bg-[rgba(127,119,221,0.28)] text-[#AFA9EC] rounded-[2px] px-0.5 not-italic">binary search trees</mark> guarantee O(log n) lookup...
          </p>
        </div>
      </div>
    </motion.section>
  );
}
