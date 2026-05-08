"use client";

import { motion } from "motion/react";
import { CONTENT } from "@/lib/constants";
import { fadeUp } from "@/lib/fadeUp";

export function HowItWorks() {
  return (
    <motion.section id="how-it-works" {...fadeUp}>
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
                <div className="h-[3px] rounded-full" style={{ width: w.bar, background: w.barColor }} />
              </div>
              <p className="text-[11px] text-white/32 leading-[1.5]">{w.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
