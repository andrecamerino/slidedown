"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CONTENT } from "@/lib/constants";
import { UploadZone } from "@/components/converter/UploadZone";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
};

export function Hero() {
  return (
    <section className="relative text-center pt-[58px] pb-6 overflow-hidden">
      {/* Orbs */}
      <div className="orb absolute rounded-full pointer-events-none" style={{ width: 360, height: 240, background: "rgba(127,119,221,0.30)", top: -60, left: "50%", transform: "translateX(-50%)", filter: "blur(65px)" }} />
      <div className="orb absolute rounded-full pointer-events-none" style={{ width: 200, height: 200, background: "rgba(93,202,165,0.10)", top: 30, left: "5%", filter: "blur(65px)" }} />
      <div className="orb absolute rounded-full pointer-events-none" style={{ width: 180, height: 180, background: "rgba(175,169,236,0.15)", top: 10, right: "5%", filter: "blur(65px)" }} />

      <div className={`${CONTENT} relative z-10`}>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0 }}>
          <div className="inline-flex items-center gap-1.5 text-[12px] px-3 py-[5px] rounded-full border border-[rgba(127,119,221,0.4)] bg-[rgba(127,119,221,0.1)] text-[#AFA9EC] mb-[22px]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7F77DD]" />
            free for students · no sign-up needed
          </div>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="text-[40px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.02em] mb-3.5"
          style={{ background: "linear-gradient(130deg,#fff 0%,#AFA9EC 60%,#7F77DD 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          Your lecture slides,<br />ready for any AI
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.14 }}
          className="text-[14px] text-white/45 max-w-[420px] mx-auto mb-5 leading-[1.75]"
        >
          Upload your lecture PDFs or PowerPoints and get back clean, readable text. Paste it straight into ChatGPT, Claude, or any AI — and actually get useful answers.
        </motion.p>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.18 }}>
          <div className="inline-flex border border-white/[0.07] rounded-xl overflow-hidden mb-7 max-w-[480px] w-full">
            <div className="flex-1 py-3 border-r border-white/[0.07]">
              <div className="text-[20px] font-medium text-white tracking-[-0.02em]">10<span className="text-[14px] text-[#AFA9EC]">x</span></div>
              <div className="text-[11px] text-white/32 mt-0.5">more slides per prompt</div>
            </div>
            <div className="flex-1 py-3 border-r border-white/[0.07]">
              <div className="text-[20px] font-medium text-white tracking-[-0.02em]"><span className="text-[14px] text-[#AFA9EC]">fits </span>free<span className="text-[14px] text-[#AFA9EC]"> tier</span></div>
              <div className="text-[11px] text-white/32 mt-0.5">ChatGPT, Claude, Gemini</div>
            </div>
            <div className="flex-1 py-3">
              <div className="text-[20px] font-medium text-white tracking-[-0.02em]"><span className="text-[14px] text-[#AFA9EC]">no </span>login</div>
              <div className="text-[11px] text-white/32 mt-0.5">just upload and go</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.22 }}
          className="flex flex-col lg:flex-row gap-2.5 justify-center mb-8"
        >
          <Link href="/convert" className="btn-glow text-[14px] px-[22px] py-2.5 rounded-[9px] font-medium text-white" style={{ background: "linear-gradient(135deg,#534AB7,#7F77DD)" }}>
            convert a file free
          </Link>
          <a href="#how-it-works" className="btn-ghost-glow text-[14px] px-[22px] py-2.5 rounded-[9px] border border-white/[0.12] text-white/55 bg-white/[0.04]">
            see how it works
          </a>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.28 }}>
          <UploadZone />
        </motion.div>
      </div>
    </section>
  );
}
