"use client";

import { useEffect, useState, FormEvent } from "react";
import { useTranslation } from "@/i18n/LanguageContext";
import { formatDate } from "@/lib/date";

interface ApprovedComment {
  id: string;
  name: string;
  text: string;
  createdAt: string;
}

export default function Comments({
  pageId,
  pageTitle,
}: {
  pageId: string;
  pageTitle: string;
  pageUrl: string;
}) {
  const { t } = useTranslation();
  const [comments, setComments] = useState<ApprovedComment[] | null>(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    fetch(`/.netlify/functions/list-comments?pageId=${encodeURIComponent(pageId)}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch(() => setComments([]));
  }, [pageId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/.netlify/functions/submit-comment", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pageId, pageTitle, name, text, company }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setName("");
      setText("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mt-12 border-t border-gray-100 pt-10">
      <h2 className="text-lg font-bold text-gray-900">{t("blogPage.commentsTitle")}</h2>
      <p className="mt-1 text-sm text-gray-500">{t("blogPage.commentsSubtitle")}</p>

      {status === "sent" ? (
        <p className="mt-6 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
          Thanks, your comment has been submitted and will appear once approved.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          {/* Honeypot: hidden from real visitors via CSS, bots fill every field. */}
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          />
          <textarea
            placeholder="Write a comment…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            minLength={2}
            maxLength={2000}
            rows={4}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-60"
          >
            {status === "sending" ? "Posting…" : "Post Comment"}
          </button>
          {status === "error" && (
            <p className="text-sm text-red-600">Something went wrong, please try again.</p>
          )}
        </form>
      )}

      <div className="mt-8 space-y-4">
        {comments === null && <p className="text-sm text-gray-400">Loading comments…</p>}
        {comments?.length === 0 && (
          <p className="text-sm text-gray-400">No comments yet, be the first to share your thoughts.</p>
        )}
        {comments?.map((c) => (
          <div key={c.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-semibold text-gray-900">{c.name}</p>
              <p className="text-xs text-gray-400">{formatDate(c.createdAt)}</p>
            </div>
            <p className="mt-1.5 whitespace-pre-wrap text-sm text-gray-700">{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
