const MergeDemo = () => {
  return (
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
  )
}

export default MergeDemo