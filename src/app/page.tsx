import { Navbar } from "@/components/layout/Navbar";
import { UploadZone } from "@/components/converter/UploadZone";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0c0f]">
      <Navbar />

      {/* Hero */}
      <section className="relative text-center px-7 pt-16 pb-12 overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute rounded-full pointer-events-none" style={{width:360,height:240,background:"rgba(127,119,221,0.30)",top:-60,left:"50%",transform:"translateX(-50%)",filter:"blur(65px)"}} />
        <div className="absolute rounded-full pointer-events-none" style={{width:200,height:200,background:"rgba(93,202,165,0.10)",top:30,left:"5%",filter:"blur(65px)"}} />
        <div className="absolute rounded-full pointer-events-none" style={{width:180,height:180,background:"rgba(175,169,236,0.15)",top:10,right:"5%",filter:"blur(65px)"}} />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full border border-[rgba(127,119,221,0.4)] bg-[rgba(127,119,221,0.1)] text-[#AFA9EC] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7F77DD]" />
            free for students · no sign-up needed
          </div>

          <h1 className="text-[40px] md:text-[48px] font-medium leading-[1.15] tracking-tight mb-4" style={{background:"linear-gradient(130deg,#fff 0%,#AFA9EC 60%,#7F77DD 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            Your lecture slides,<br />ready for any AI
          </h1>

          <p className="text-[14px] text-white/45 max-w-[420px] mx-auto mb-6 leading-relaxed">
            Upload your lecture PDFs or PowerPoints and get back clean, readable text. Paste it straight into ChatGPT, Claude, or any AI — and actually get useful answers.
          </p>

          {/* Stats */}
          <div className="inline-flex border border-white/[0.07] rounded-xl overflow-hidden mb-7 max-w-[480px] w-full">
            {[
              { num: "10x", label: "more slides per prompt" },
              { num: "free tier", label: "ChatGPT, Claude, Gemini" },
              { num: "no login", label: "just upload and go" },
            ].map((s, i) => (
              <div key={i} className="flex-1 py-3 border-r border-white/[0.07] last:border-r-0">
                <div className="text-[18px] font-medium text-white tracking-tight">{s.num}</div>
                <div className="text-[11px] text-white/32 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2.5 justify-center">
            <Link href="/convert" className="btn-glow text-[14px] px-5 py-2.5 rounded-[9px] font-medium text-white cursor-pointer" style={{background:"linear-gradient(135deg,#534AB7,#7F77DD)"}}>
              convert a file free
            </Link>
            <Link href="#how-it-works" className="btn-ghost-glow text-[14px] px-5 py-2.5 rounded-[9px] border border-white/[0.12] text-white/55 bg-white/[0.04] cursor-pointer">
              see how it works
            </Link>
          </div>
        </div>
      </section>

      <UploadZone />

      {/* Features */}
      <section id="features" className="px-6 pb-8">
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#7F77DD] mb-2">features</p>
        <h2 className="text-[22px] font-medium text-white mb-2 tracking-tight">Everything you need for AI-powered study</h2>
        <p className="text-[13px] text-white/38 mb-5 leading-relaxed">Built by students, for students who want to actually get value out of AI tools.</p>

        <div className="grid grid-cols-2 gap-2.5 mb-2.5">
          {[
            { title: "converts slides to readable text", desc: "Turns your PDF or PowerPoint into clean text that AI can actually understand and work with.", pill: "PDF + PowerPoint", accent: true },
            { title: "merge all your lecture files", desc: "Combine every week's slides into one document. Search your entire semester in seconds.", pill: "exam season essential", accent: false },
            { title: "pull out your highlights", desc: "Already annotated your PDF? Extract only your highlighted text into a clean summary.", pill: "annotations only", accent: false },
            { title: "works with any AI tool", desc: "No lock-in. Copy and paste into whichever AI you already use — ChatGPT, Claude, Gemini.", pill: "one-click copy", accent: false },
          ].map((f) => (
            <div key={f.title} className={`rounded-xl p-4 relative overflow-hidden border transition-all duration-200 hover:border-[rgba(127,119,221,0.3)] hover:shadow-[0_0_20px_rgba(127,119,221,0.08)] ${f.accent ? "border-[rgba(127,119,221,0.22)] bg-[rgba(127,119,221,0.05)]" : "border-white/[0.07] bg-[#111115]"}`}>
              <div className="w-7 h-7 rounded-lg bg-[rgba(127,119,221,0.14)] border border-[rgba(127,119,221,0.25)] flex items-center justify-center mb-2.5">
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="#AFA9EC" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M2 2h11M2 5.5h8M2 9h6M2 12.5h4" />
                </svg>
              </div>
              <p className="text-[13px] font-medium text-white mb-1">{f.title}</p>
              <p className="text-[12px] text-white/35 leading-relaxed mb-2">{f.desc}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(127,119,221,0.13)] text-[#AFA9EC] border border-[rgba(127,119,221,0.22)]">{f.pill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-8 border-t border-white/[0.06] bg-[#0e0e12]">
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#7F77DD] mb-2">why it works</p>
        <h2 className="text-[22px] font-medium text-white mb-2 tracking-tight">Why can&apos;t I just upload my PDF directly?</h2>
        <p className="text-[13px] text-white/38 leading-relaxed mb-5">AI tools have a limit on how much text they can read at once. PDFs are full of hidden junk — layout code, image data, metadata — that eats into that limit fast. Slidedown strips all that away so the AI reads your actual content, not the noise.</p>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { num: "30 slides", color: "text-white", bar: "100%", barColor: "rgba(232,75,74,0.45)", label: "raw PDF — hits the AI limit fast, often cuts off mid-lecture" },
            { num: "30 slides", color: "text-[#AFA9EC]", bar: "31%", barColor: "#7F77DD", label: "after slidedown — same content, a fraction of the space used" },
            { num: "fits free tier", color: "text-[#5DCAA5]", bar: "70%", barColor: "#5DCAA5", label: "your whole lecture fits without upgrading your AI plan" },
          ].map((w, i) => (
            <div key={i} className="bg-[#111115] border border-white/[0.07] rounded-xl p-3.5">
              <div className={`text-[22px] font-medium tracking-tight mb-1 ${w.color}`}>{w.num}</div>
              <div className="h-[3px] bg-white/[0.07] rounded-full my-2">
                <div className="h-[3px] rounded-full" style={{ width: w.bar, background: w.barColor }} />
              </div>
              <p className="text-[11px] text-white/32 leading-relaxed">{w.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-white/[0.06] text-center text-[12px] text-white/25">
        slidedown · built for students · free forever for core features
      </footer>
    </div>
  );
}
