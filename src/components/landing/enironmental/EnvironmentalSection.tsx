"use client";

import { motion } from "motion/react";
import { CONTENT } from "@/lib/constants";
import { RiErrorWarningLine } from "react-icons/ri";
import EnironmentalCard from "./EnironmentalCard";
import { fadeUp } from "@/lib/fadeUp";

export function EnvironmentalSection() {
  return (
    <motion.section
      {...fadeUp}
      className="relative overflow-hidden"
      style={{ background: "#0a0f0d", borderTop: "0.5px solid rgba(93,202,165,0.12)", borderBottom: "0.5px solid rgba(93,202,165,0.12)" }}
    >
      <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[rgba(29,158,117,0.08)] pointer-events-none" style={{ filter: "blur(50px)" }} />
      <div className={`${CONTENT} py-8 relative`}>
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#5DCAA5] mb-2">environmental impact</p>
        <h2 className="text-[22px] font-medium text-white mb-2 tracking-[-0.02em] leading-[1.3]">Use AI more responsibly — not less</h2>
        <p className="text-[13px] text-white/38 leading-[1.75] mb-5">
          We get it — AI uses real energy and real water. But the problem isn&apos;t using AI, it&apos;s using it{" "}
          <em className="not-italic text-white/60">inefficiently</em>. Uploading a messy PDF means the AI has to work harder, retry more, and consume more resources to get you a useful answer. Slidedown makes every prompt count.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
          {[
            { title: "fewer retries", text: "Clean text means the AI understands first time — no wasted follow-up prompts" },
            { title: "~70% less", text: "content passed to the AI per session, meaning less processing per study session" },
            { title: "fits free tier", text: "No need to run multiple AI subscriptions — one clean prompt does more" },
          ].map((ec, index) => (
            <EnironmentalCard key={index} ecard={ec} />
          ))}
        </div>

        <div className="flex items-start gap-2.5 rounded-[10px] px-3.5 py-3" style={{ background: "rgba(93,202,165,0.05)", border: "0.5px solid rgba(93,202,165,0.15)" }}>
          <div className="w-7 h-7 rounded-[7px] bg-[rgba(93,202,165,0.12)] flex items-center justify-center flex-shrink-0 mt-[1px]">
            <RiErrorWarningLine color="#5DCAA5" />
          </div>
          <p className="text-[12px] text-white/45 leading-[1.7]">
            <strong className="text-white/75 font-medium">A note on honesty: </strong> AI energy use is real, but often overstated online. The bigger win is using AI intentionally — fewer, better prompts rather than dozens of frustrated retries. That&apos;s what Slidedown helps you do.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
