"use client";

import { motion } from "motion/react";
import { CONTENT } from "@/lib/constants";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="border-t border-white/[0.06]"
    >
      <div className={`${CONTENT} py-6 text-center text-[12px] text-white/25`}>
        slidedown · built for students · free forever for core features
      </div>
    </motion.footer>
  );
}
