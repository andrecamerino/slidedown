const CtrlFDemo = () => {
  return (
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
  )
}

export default CtrlFDemo