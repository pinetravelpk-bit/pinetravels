"use client";

import { useState } from "react";
import { Upload, Loader2, Copy, Check, AlertCircle, FileVideo } from "lucide-react";

export default function MediaUploader({ initialItems = [] }) {
  const [items, setItems] = useState(initialItems);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const upload = async (files) => {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    for (const file of Array.from(files)) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/media", { method: "POST", body: fd });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(json.error || "Upload fail ho gaya.");
          continue;
        }
        setItems((prev) => [
          { id: `new-${json.filename}`, filename: json.filename, url: json.url, kind: json.kind, size_bytes: json.size },
          ...prev,
        ]);
      } catch {
        setError("Upload fail ho gaya.");
      }
    }
    setBusy(false);
  };

  const copy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      setError("Copy nahi hua — URL manually select kar lein.");
    }
  };

  return (
    <div className="mt-6">
      <label className="relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-pine-600/25 bg-white px-6 py-10 text-center transition-colors hover:border-pine-600/50">
        <input
          type="file"
          multiple
          accept="image/*,video/mp4,video/webm"
          onChange={(e) => upload(e.target.files)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        {busy ? (
          <Loader2 className="h-6 w-6 animate-spin text-pine-600" />
        ) : (
          <Upload className="h-6 w-6 text-pine-600" strokeWidth={1.7} />
        )}
        <span className="mt-3 font-display text-[15px] font-bold text-ink">
          {busy ? "Upload ho raha hai…" : "Files yahan click kar ke choose karein"}
        </span>
        <span className="mt-1 text-[13px] text-ink-faint">
          Images 8 MB tak · Videos (MP4/WEBM) 60 MB tak
        </span>
      </label>

      {error && (
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-maroon-600/10 px-3 py-2.5 text-[13.5px] text-maroon-700">
          <AlertCircle className="h-4 w-4" /> {error}
        </p>
      )}

      {items.length === 0 ? (
        <p className="mt-8 text-center text-[14px] text-ink-faint">Abhi tak koi file upload nahi hui.</p>
      ) : (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <div key={m.id || m.url} className="overflow-hidden rounded-xl border border-pine-600/10 bg-white">
              <div className="grid h-32 place-items-center bg-[#f5f6f4]">
                {m.kind === "video" ? (
                  <FileVideo className="h-8 w-8 text-pine-600" strokeWidth={1.6} />
                ) : (
                  <img src={m.url} alt={m.filename} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-[13px] font-semibold text-ink">{m.filename}</p>
                <p className="text-[12px] text-ink-faint">
                  {m.kind} · {Math.max(1, Math.round((m.size_bytes || 0) / 1024))} KB
                </p>
                <button
                  onClick={() => copy(m.url)}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-pine-600/25 px-2.5 py-1.5 text-[12.5px] font-semibold text-pine-700 hover:bg-pine-50"
                >
                  {copied === m.url ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied === m.url ? "Copied!" : "Copy URL"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
