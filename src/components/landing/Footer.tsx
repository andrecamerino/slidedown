"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CONTENT } from "@/lib/constants";
import { FeedbackModal } from "@/components/feedback/FeedbackModal";

export function Footer() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="border-t border-white/[0.06]"
      >
        <div className={`${CONTENT} py-6 text-center text-[12px] text-white/25`}>
          slidedown · built for students · free forever for core features · {" "}
          <button
            onClick={() => setFeedbackOpen(true)}
            className="hover:text-white/50 transition-colors cursor-pointer"
          >
            feedback
          </button>
        </div>
      </motion.footer>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
}
