"use client";

import { useState, useEffect } from "react";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [well, setWell] = useState("");
  const [better, setBetter] = useState("");
  const [frequency, setFrequency] = useState("");
  const [returnIntent, setReturnIntent] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmingClose, setConfirmingClose] = useState(false);

  const hasContent = rating > 0 || !!well || !!better || !!frequency || !!returnIntent || !!email;

  const handleClose = () => {
    if (hasContent) {
      setConfirmingClose(true);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, hasContent]);

  useEffect(() => {
    if (open) return;
    setRating(0);
    setHoveredRating(0);
    setWell("");
    setBetter("");
    setFrequency("");
    setReturnIntent("");
    setEmail("");
    setSubmitting(false);
    setSubmitted(false);
    setConfirmingClose(false);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formId = process.env.NEXT_PUBLIC_FEEDBACK_FORM_ID;
    const entryRating = process.env.NEXT_PUBLIC_FEEDBACK_ENTRY_RATING;
    const entryWell = process.env.NEXT_PUBLIC_FEEDBACK_ENTRY_WELL;
    const entryBetter = process.env.NEXT_PUBLIC_FEEDBACK_ENTRY_BETTER;
    const entryFrequency = process.env.NEXT_PUBLIC_FEEDBACK_ENTRY_FREQUENCY;
    const entryReturn = process.env.NEXT_PUBLIC_FEEDBACK_ENTRY_RETURN;
    const entryEmail = process.env.NEXT_PUBLIC_FEEDBACK_ENTRY_EMAIL;

    const body = new URLSearchParams();
    if (entryRating && rating) body.append(entryRating, String(rating));
    if (entryWell && well) body.append(entryWell, well);
    if (entryBetter && better) body.append(entryBetter, better);
    if (entryFrequency && frequency) body.append(entryFrequency, frequency);
    if (entryReturn && returnIntent) body.append(entryReturn, returnIntent);
    if (entryEmail && email) body.append(entryEmail, email);
    body.append("fvv", "1");
    body.append("fbzx", String(Math.floor(Math.random() * 1e16)));

    console.log("[feedback] formId:", formId);
    console.log("[feedback] body:", body.toString());

    try {
      await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
        method: "POST",
        mode: "no-cors",
        body,
      });
    } catch {
      // network error — still show success (optimistic)
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  if (!open) return null;

  if (submitted) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="bg-[#111115] border border-white/[0.07] rounded-2xl p-8 max-w-sm w-full mx-4 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-12 rounded-full bg-[#7F77DD]/15 border border-[#7F77DD]/30 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 10 8 14 16 6" />
            </svg>
          </div>
          <h2 className="text-white text-[17px] font-semibold mb-2">thanks for your feedback!</h2>
          <p className="text-white/40 text-[13px] mb-6">it helps us build a better slidedown.</p>
          <button onClick={onClose} className="btn-convert text-white text-[13px] font-medium px-6 py-2.5 rounded-lg">
            close
          </button>
        </div>
      </div>
    );
  }

  if (confirmingClose) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={() => setConfirmingClose(false)}
      >
        <div
          className="bg-[#111115] border border-white/[0.07] rounded-2xl p-8 max-w-sm w-full mx-4 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-white text-[17px] font-semibold mb-2">discard your feedback?</h2>
          <p className="text-white/40 text-[13px] mb-6">everything you&apos;ve typed will be lost.</p>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmingClose(false)}
              className="flex-1 py-2.5 rounded-lg text-[13px] border border-white/[0.07] text-white/55 hover:text-white/80 hover:border-white/20 transition-colors cursor-pointer"
            >
              keep editing
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-[13px] border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              discard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-[#111115] border border-white/[0.07] rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-[17px] font-semibold">share your thoughts</h2>
          <button
            onClick={handleClose}
            className="text-white/30 hover:text-white/60 transition-colors text-2xl leading-none w-7 h-7 flex items-center justify-center cursor-pointer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Rating */}
          <div>
            <label className="text-white/55 text-[13px] block mb-2">overall rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onMouseEnter={() => setHoveredRating(n)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(n)}
                  className={`text-2xl transition-colors leading-none cursor-pointer ${
                    n <= (hoveredRating || rating) ? "text-[#7F77DD]" : "text-white/20"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* What went well */}
          <div>
            <label className="text-white/55 text-[13px] block mb-2">what went well?</label>
            <textarea
              value={well}
              onChange={(e) => setWell(e.target.value)}
              rows={3}
              placeholder="anything you liked..."
              className="w-full bg-[#141418] border border-white/[0.07] rounded-lg px-3 py-2.5 text-[13px] text-white placeholder-white/20 resize-none focus:outline-none focus:border-[#7F77DD]/40 transition-colors"
            />
          </div>

          {/* What could be better */}
          <div>
            <label className="text-white/55 text-[13px] block mb-2">what could be better?</label>
            <textarea
              value={better}
              onChange={(e) => setBetter(e.target.value)}
              rows={3}
              placeholder="anything we could improve..."
              className="w-full bg-[#141418] border border-white/[0.07] rounded-lg px-3 py-2.5 text-[13px] text-white placeholder-white/20 resize-none focus:outline-none focus:border-[#7F77DD]/40 transition-colors"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="text-white/55 text-[13px] block mb-2">how often do you use slidedown?</label>
            <div className="relative">
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-[#141418] border border-white/[0.07] rounded-lg px-3 pr-8 py-2.5 text-[13px] text-white focus:outline-none focus:border-[#7F77DD]/40 transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-[#141418] text-white/40">
                  select one...
                </option>
                <option value="Daily" className="bg-[#141418] text-white">daily</option>
                <option value="A few times a week" className="bg-[#141418] text-white">a few times a week</option>
                <option value="Occasionally" className="bg-[#141418] text-white">occasionally</option>
                <option value="First time" className="bg-[#141418] text-white">first time</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30"
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="2 4 6 8 10 4" />
              </svg>
            </div>
          </div>

          {/* Return intent */}
          <div>
            <label className="text-white/55 text-[13px] block mb-2">
              could you see yourself using slidedown regularly?
            </label>
            <div className="flex gap-2">
              {["Yes", "Maybe", "No"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setReturnIntent(opt)}
                  className={`flex-1 py-2 rounded-lg text-[13px] border transition-colors ${
                    returnIntent === opt
                      ? "border-[#7F77DD]/50 bg-[#7F77DD]/10 text-white"
                      : "border-white/[0.07] text-white/40 hover:text-white/60 hover:border-white/20 cursor-pointer"
                  }`}
                >
                  {opt.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-white/55 text-[13px] block mb-2">
              email{" "}
              <span className="text-white/25">(optional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="so we can follow up"
              className="w-full bg-[#141418] border border-white/[0.07] rounded-lg px-3 py-2.5 text-[13px] text-white placeholder-white/20 focus:outline-none focus:border-[#7F77DD]/40 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-convert text-white text-[13px] font-medium py-2.5 rounded-lg hover:opacity-75 cursor-pointer"
          >
            {submitting ? "sending..." : "send feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
