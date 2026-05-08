"use client";

import { VscListFlat } from "react-icons/vsc";
import { LuMerge } from "react-icons/lu";
import { IoStatsChart } from "react-icons/io5";
import { LuBrainCircuit } from "react-icons/lu";

import { motion } from "motion/react";
import { CONTENT } from "@/lib/constants";
import Feature, { FeatureProps } from "./Feature";
import MergeDemo from "./MergeDemo";
import CtrlFDemo from "./CtrlFDemo";

const FeatureContent: FeatureProps[] = [
  {
    icon: VscListFlat,
    title: "converts slides to readable text",
    text: "Turns your PDF or PowerPoint into clean text that AI can actually understand and work with.",
    tagText: "PDF + PowerPoint",
  },
  {
    icon: LuMerge,
    title: "merge all your lecture files",
    text: "Combine every week&apos;s slides into one document. Search your entire semester in seconds - perfect for online open-book exams.",
    tagText: "one 'ctrl + f' away",
  },
  {
    icon: IoStatsChart,
    title: "see how much you saved",
    text: "Once converted, you get a summary of how much storage you saved by converting to text/markdown instead of using the slides.",
    tagText: "data-driven",
  },
  {
    icon: LuBrainCircuit,
    title: "works with any AI tool",
    text: "No lock-in. Copy your text and paste into whichever AI you already use — ChatGPT, Claude, Gemini, anything.",
    tagText: "one-click copy",
  },
]

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

        <p className="text-[11px] font-medium tracking-widest uppercase text-[#7F77DD] mb-2">features</p>
        <h2 className="text-[22px] font-medium text-white mb-1.5 tracking-[-0.02em] leading-tight">Everything you need for AI-powered study</h2>
        <p className="text-[13px] text-white/38 mb-5 leading-[1.7]">Built by students, for students who want to actually get value out of AI tools.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
          {FeatureContent.map((feature, index) => <Feature key={index} feature={feature} primary={index === 0}/>)}
        </div>

        <MergeDemo />
        <CtrlFDemo />
      </div>
    </motion.section>
  );
}
