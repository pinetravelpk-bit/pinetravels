"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  if (done) {
    return (
      <p className="flex items-center gap-2 rounded-2xl border border-brand/40 bg-brand/10 px-4 py-3.5 text-sm text-brand">
        <Check size={16} /> Thanks — you&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2 rounded-2xl border border-line bg-white/[0.03] p-1.5">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-faint focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-ink-900 transition-transform hover:-translate-y-0.5"
      >
        <ArrowRight size={17} strokeWidth={2.25} />
      </button>
    </form>
  );
}
