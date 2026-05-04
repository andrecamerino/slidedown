import { Navbar } from "@/components/layout/Navbar";
import { UploadZone } from "@/components/converter/UploadZone";
import Link from "next/link";
import { CONTENT } from "@/lib/constants";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0c0f]">
      <Navbar />

      {/* Hero */}
      <section className="relative text-center pt-[58px] pb-11 overflow-hidden">
        <div className="orb absolute rounded-full pointer-events-none" style={{width:360,height:240,background:"rgba(127,119,221,0.30)",top:-60,left:"50%",transform:"translateX(-50%)",filter:"blur(65px)"}} />
        <div className="orb absolute rounded-full pointer-events-none" style={{width:200,height:200,background:"rgba(93,202,165,0.10)",top:30,left:"5%",filter:"blur(65px)"}} />
        <div className="orb absolute rounded-full pointer-events-none" style={{width:180,height:180,background:"rgba(175,169,236,0.15)",top:10,right:"5%",filter:"blur(65px)"}} />

        <div className={`${CONTENT} relative z-10`}>
          <div className="inline-flex items-center gap-1.5 text-[12px] px-3 py-[5px] rounded-full border border-[rgba(127,119,221,0.4)] bg-[rgba(127,119,221,0.1)] text-[#AFA9EC] mb-[22px]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7F77DD]" />
            free for students · no sign-up needed
          </div>

          <h1
            className="text-[40px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.02em] mb-3.5"
            style={{background:"linear-gradient(130deg,#fff 0%,#AFA9EC 60%,#7F77DD 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}
          >
            Your lecture slides,<br />ready for any AI
          </h1>

          <p className="text-[14px] text-white/45 max-w-[420px] mx-auto mb-5 leading-[1.75]">
            Upload your lecture PDFs or PowerPoints and get back clean, readable text. Paste it straight into ChatGPT, Claude, or any AI — and actually get useful answers.
          </p>

          {/* Stats row */}
          <div className="inline-flex border border-white/[0.07] rounded-xl overflow-hidden mb-7 max-w-[480px] w-full">
            <div className="flex-1 py-3 border-r border-white/[0.07]">
              <div className="text-[20px] font-medium text-white tracking-[-0.02em]">
                10<span className="text-[14px] text-[#AFA9EC]">x</span>
              </div>
              <div className="text-[11px] text-white/32 mt-0.5">more slides per prompt</div>
            </div>
            <div className="flex-1 py-3 border-r border-white/[0.07]">
              <div className="text-[20px] font-medium text-white tracking-[-0.02em]">
                <span className="text-[14px] text-[#AFA9EC]">fits </span>free<span className="text-[14px] text-[#AFA9EC]"> tier</span>
              </div>
              <div className="text-[11px] text-white/32 mt-0.5">ChatGPT, Claude, Gemini</div>
            </div>
            <div className="flex-1 py-3">
              <div className="text-[20px] font-medium text-white tracking-[-0.02em]">
                <span className="text-[14px] text-[#AFA9EC]">no </span>login
              </div>
              <div className="text-[11px] text-white/32 mt-0.5">just upload and go</div>
            </div>
          </div>

          <div className="flex gap-2.5 justify-center">
            <Link href="/convert" className="btn-glow text-[14px] px-[22px] py-2.5 rounded-[9px] font-medium text-white" style={{background:"linear-gradient(135deg,#534AB7,#7F77DD)"}}>
              convert a file free
            </Link>
            <a href="#how-it-works" className="btn-ghost-glow text-[14px] px-[22px] py-2.5 rounded-[9px] border border-white/[0.12] text-white/55 bg-white/[0.04]">
              see how it works
            </a>
          </div>
        </div>
      </section>

      <div className={CONTENT}>
        <UploadZone />
      </div>

      {/* Features */}
      <section id="features">
        <div className={`${CONTENT} pb-8`}>
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#7F77DD] mb-2">features</p>
          <h2 className="text-[22px] font-medium text-white mb-1.5 tracking-[-0.02em] leading-[1.25]">Everything you need for AI-powered study</h2>
          <p className="text-[13px] text-white/38 mb-5 leading-[1.7]">Built by students, for students who want to actually get value out of AI tools.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
            {/* Card 1 — converts slides */}
            <div className="rounded-xl p-4 relative overflow-hidden border transition-all duration-200 hover:border-[rgba(127,119,221,0.3)] hover:shadow-[0_0_20px_rgba(127,119,221,0.08)] border-[rgba(127,119,221,0.22)] bg-[rgba(127,119,221,0.05)]">
              <div className="absolute top-[-30px] right-[-30px] w-[90px] h-[90px] rounded-full bg-[rgba(127,119,221,0.1)] pointer-events-none" style={{filter:"blur(25px)"}} />
              <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(127,119,221,0.14)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center mb-2.5">
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="#AFA9EC" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M2 2h11M2 5.5h8M2 9h6M2 12.5h4" />
                </svg>
              </div>
              <p className="text-[13px] font-medium text-white mb-1">converts slides to readable text</p>
              <p className="text-[12px] text-white/35 leading-[1.6] mb-2">Turns your PDF or PowerPoint into clean text that AI can actually understand and work with.</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(127,119,221,0.13)] text-[#AFA9EC] border border-[rgba(127,119,221,0.22)]">PDF + PowerPoint</span>
            </div>

            {/* Card 2 — merge files */}
            <div className="rounded-xl p-4 relative overflow-hidden border transition-all duration-200 hover:border-[rgba(127,119,221,0.3)] hover:shadow-[0_0_20px_rgba(127,119,221,0.08)] border-white/[0.07] bg-[#111115]">
              <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(127,119,221,0.14)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center mb-2.5">
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="#AFA9EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1.5" y="2" width="5" height="6" rx="1" />
                  <rect x="8.5" y="2" width="5" height="6" rx="1" />
                  <path d="M4 11.5h7M7.5 8v3.5" />
                </svg>
              </div>
              <p className="text-[13px] font-medium text-white mb-1">merge all your lecture files</p>
              <p className="text-[12px] text-white/35 leading-[1.6] mb-2">Combine every week&apos;s slides into one document. Search your entire semester in seconds — great for open-book exams.</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(127,119,221,0.13)] text-[#AFA9EC] border border-[rgba(127,119,221,0.22)]">exam season essential</span>
            </div>

            {/* Card 3 — highlights */}
            <div className="rounded-xl p-4 relative overflow-hidden border transition-all duration-200 hover:border-[rgba(127,119,221,0.3)] hover:shadow-[0_0_20px_rgba(127,119,221,0.08)] border-white/[0.07] bg-[#111115]">
              <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(127,119,221,0.14)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center mb-2.5">
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="#AFA9EC" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="10" cy="5" r="2" />
                  <path d="M3 5h5M3 9h9M3 13h9" />
                  <circle cx="6" cy="9" r="1.5" />
                </svg>
              </div>
              <p className="text-[13px] font-medium text-white mb-1">pull out your highlights</p>
              <p className="text-[12px] text-white/35 leading-[1.6] mb-2">Already annotated your PDF? Extract only your highlighted text and comments into a clean summary.</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(127,119,221,0.13)] text-[#AFA9EC] border border-[rgba(127,119,221,0.22)]">annotations only</span>
            </div>

            {/* Card 4 — any AI */}
            <div className="rounded-xl p-4 relative overflow-hidden border transition-all duration-200 hover:border-[rgba(127,119,221,0.3)] hover:shadow-[0_0_20px_rgba(127,119,221,0.08)] border-white/[0.07] bg-[#111115]">
              <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(127,119,221,0.14)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center mb-2.5">
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="#AFA9EC" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="2" y="2" width="11" height="11" rx="2" />
                  <path d="M5 7.5h5M7.5 5v5" />
                </svg>
              </div>
              <p className="text-[13px] font-medium text-white mb-1">works with any AI tool</p>
              <p className="text-[12px] text-white/35 leading-[1.6] mb-2">No lock-in. Copy your text and paste into whichever AI you already use — ChatGPT, Claude, Gemini, anything.</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(127,119,221,0.13)] text-[#AFA9EC] border border-[rgba(127,119,221,0.22)]">one-click copy</span>
            </div>
          </div>

          {/* Merge demo */}
          <div className="bg-[#111115] border border-white/[0.07] rounded-xl p-4 mb-2.5 relative overflow-hidden">
            <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[200px] h-[70px] bg-[rgba(93,202,165,0.08)] pointer-events-none" style={{filter:"blur(28px)"}} />
            <p className="text-[12px] font-medium text-white mb-3">merge for open-book exams — search your entire semester</p>

            <div className="flex flex-col gap-1.5 mb-3">
              {[
                { type: "PDF", name: "week1_intro.pdf", slides: "18 slides", pdfStyle: true },
                { type: "PPT", name: "week2_data_structures.pptx", slides: "24 slides", pdfStyle: false },
                { type: "PDF", name: "week3_algorithms.pdf", slides: "31 slides", pdfStyle: true },
              ].map((f) => (
                <div key={f.name} className="flex items-center gap-2.5 bg-[#0e0e12] border border-white/[0.06] rounded-[7px] px-2.5 py-[7px]">
                  <div className={`text-[10px] font-medium w-[26px] h-[26px] rounded-[6px] flex items-center justify-center flex-shrink-0 ${f.pdfStyle ? "bg-[rgba(232,75,74,0.13)] text-[#F09595] border border-[rgba(232,75,74,0.22)]" : "bg-[rgba(239,159,39,0.13)] text-[#FAC775] border border-[rgba(239,159,39,0.22)]"}`}>
                    {f.type}
                  </div>
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

            <div className="flex items-center gap-2.5 bg-[rgba(93,202,165,0.05)] border border-[rgba(93,202,165,0.18)] rounded-lg px-[11px] py-2">
              <div className="w-[26px] h-[26px] rounded-[6px] bg-[rgba(93,202,165,0.13)] flex items-center justify-center flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#5DCAA5" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M2 2h9M2 5h7M2 8h5M2 11h6" />
                </svg>
              </div>
              <span className="text-[12px] text-[#5DCAA5] flex-1">semester_notes_combined.md</span>
              <span className="text-[11px] text-[rgba(93,202,165,0.45)]">73 slides · Ctrl+F ready</span>
            </div>
          </div>

          {/* Ctrl+F demo */}
          <div className="bg-[#111115] border border-white/[0.07] rounded-xl p-4">
            <p className="text-[12px] font-medium text-white mb-2.5">Ctrl+F your entire semester in one place</p>
            <div className="flex items-center gap-2 bg-[#0c0c0f] border border-[rgba(127,119,221,0.3)] rounded-[7px] px-[11px] py-[7px] mb-3">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round" className="flex-shrink-0">
                <circle cx="5.5" cy="5.5" r="3.5" />
                <path d="M8.5 8.5l3 3" />
              </svg>
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
      </section>

      {/* Environmental impact */}
      <section className="relative overflow-hidden" style={{background:"#0a0f0d",borderTop:"0.5px solid rgba(93,202,165,0.12)",borderBottom:"0.5px solid rgba(93,202,165,0.12)"}}>
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[rgba(29,158,117,0.08)] pointer-events-none" style={{filter:"blur(50px)"}} />
        <div className={`${CONTENT} py-8 relative`}>
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#5DCAA5] mb-2">environmental impact</p>
          <h2 className="text-[22px] font-medium text-white mb-2 tracking-[-0.02em] leading-[1.3]">Use AI more responsibly —<br />not less</h2>
          <p className="text-[13px] text-white/38 leading-[1.75] mb-5 max-w-[520px]">
            We get it — AI uses real energy and real water. But the problem isn&apos;t using AI, it&apos;s using it{" "}
            <em className="not-italic text-white/60">inefficiently</em>. Uploading a messy PDF means the AI has to work harder, retry more, and consume more resources to get you a useful answer. Slidedown makes every prompt count.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
            {[
              { num: "fewer retries", label: "Clean text means the AI understands first time — no wasted follow-up prompts" },
              { num: "~70% less", label: "content passed to the AI per session, meaning less processing per study session" },
              { num: "fits free tier", label: "No need to run multiple AI subscriptions — one clean prompt does more" },
            ].map((c) => (
              <div key={c.num} className="rounded-[11px] p-3.5" style={{background:"#0e150f",border:"0.5px solid rgba(93,202,165,0.14)"}}>
                <div className="text-[22px] font-medium text-[#5DCAA5] tracking-[-0.02em] mb-1">{c.num}</div>
                <div className="text-[11px] text-white/32 leading-[1.5]">{c.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2.5 rounded-[10px] px-3.5 py-3" style={{background:"rgba(93,202,165,0.05)",border:"0.5px solid rgba(93,202,165,0.15)"}}>
            <div className="w-7 h-7 rounded-[7px] bg-[rgba(93,202,165,0.12)] flex items-center justify-center flex-shrink-0 mt-[1px]">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#5DCAA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.5 1v5M6.5 9v.5" />
                <circle cx="6.5" cy="6.5" r="5.5" />
              </svg>
            </div>
            <p className="text-[12px] text-white/45 leading-[1.7]">
              <strong className="text-white/75 font-medium">A note on honesty:</strong> AI energy use is real, but often overstated online. The bigger win is using AI intentionally — fewer, better prompts rather than dozens of frustrated retries. That&apos;s what Slidedown helps you do.
            </p>
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section id="how-it-works" className="border-t border-white/[0.06] bg-[#0e0e12]">
        <div className={`${CONTENT} pt-7 pb-9`}>
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#7F77DD] mb-2">why it works</p>
          <h2 className="text-[22px] font-medium text-white mb-1 tracking-[-0.02em]">Why can&apos;t I just upload my PDF directly?</h2>
          <p className="text-[13px] text-white/38 leading-[1.7]">AI tools have a limit on how much text they can read at once. PDFs are full of hidden junk — layout code, image data, metadata — that eats into that limit fast. Slidedown strips all that away so the AI reads your actual content, not the noise.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-[18px]">
            {[
              { num: "30 slides", color: "text-white", bar: "100%", barColor: "rgba(232,75,74,0.45)", label: "raw PDF — hits the AI limit fast, often cuts off mid-lecture" },
              { num: "30 slides", color: "text-[#AFA9EC]", bar: "31%", barColor: "#7F77DD", label: "after slidedown — same content, a fraction of the space used" },
              { num: "fits free tier", color: "text-[#5DCAA5]", bar: "70%", barColor: "#5DCAA5", label: "your whole lecture fits without upgrading your AI plan" },
            ].map((w, i) => (
              <div key={i} className="bg-[#111115] border border-white/[0.07] rounded-[10px] p-3.5">
                <div className={`text-[24px] font-medium tracking-[-0.03em] mb-1 ${w.color}`}>{w.num}</div>
                <div className="h-[3px] bg-white/[0.07] rounded-full my-2">
                  <div className="h-[3px] rounded-full" style={{width:w.bar,background:w.barColor}} />
                </div>
                <p className="text-[11px] text-white/32 leading-[1.5]">{w.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06]">
        <div className={`${CONTENT} py-6 text-center text-[12px] text-white/25`}>
          slidedown · built for students · free forever for core features
        </div>
      </footer>
    </div>
  );
}
