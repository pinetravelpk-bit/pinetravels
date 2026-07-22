"use client";

import { useState, useCallback } from "react";
import {
  Save, Loader2, Plus, Trash2, ChevronUp, ChevronDown,
  CheckCircle2, AlertCircle, Upload, Code2, LayoutList,
} from "lucide-react";

/* ── helpers ───────────────────────────────────────────────── */

const clone = (v) => JSON.parse(JSON.stringify(v));

const label = (key) =>
  String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();

const isMediaKey = (k) => /(^|[^a-z])(video|image|img|photo|picture|logo|poster|thumb|cover)/i.test(k);
const isLongText = (v) => typeof v === "string" && (v.length > 90 || v.includes("\n"));

function blankFrom(sample) {
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") {
    const out = {};
    for (const [k, v] of Object.entries(sample)) {
      out[k] = Array.isArray(v) ? [] : v && typeof v === "object" ? blankFrom(v) : typeof v === "number" ? 0 : typeof v === "boolean" ? false : "";
    }
    return out;
  }
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  return "";
}

/* ── field primitives ──────────────────────────────────────── */

function TextField({ name, value, onChange }) {
  const long = isLongText(value);
  const media = isMediaKey(name);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) setErr(json.error || "Upload fail ho gaya.");
      else onChange(json.url);
    } catch {
      setErr("Upload fail ho gaya.");
    }
    setUploading(false);
  };

  return (
    <label className="block">
      <span className="text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint">
        {label(name)}
      </span>
      {long ? (
        <textarea
          rows={4}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1.5 w-full resize-y rounded-lg border border-pine-600/15 bg-white px-3 py-2.5 text-[14.5px] outline-none focus:border-pine-600 focus:ring-2 focus:ring-pine-600/15"
        />
      ) : (
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-pine-600/15 bg-white px-3 py-2.5 text-[14.5px] outline-none focus:border-pine-600 focus:ring-2 focus:ring-pine-600/15"
        />
      )}

      {media && (
        <span className="mt-2 flex flex-wrap items-center gap-3">
          <span className="relative inline-flex">
            <input
              type="file"
              accept="image/*,video/mp4,video/webm"
              onChange={(e) => upload(e.target.files?.[0])}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-pine-600/25 px-3 py-1.5 text-[12.5px] font-semibold text-pine-700">
              {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
              {uploading ? "Uploading…" : "Upload file"}
            </span>
          </span>
          {value && /\.(mp4|webm|mov)$/i.test(value) && (
            <span className="text-[12px] text-ink-faint">Video set hai</span>
          )}
          {value && /\.(jpe?g|png|webp|gif|svg)$/i.test(value) && (
            <img src={value} alt="" className="h-10 w-16 rounded border border-pine-600/15 object-cover" />
          )}
          {err && <span className="text-[12px] text-maroon-600">{err}</span>}
        </span>
      )}
    </label>
  );
}

function NumberField({ name, value, onChange }) {
  return (
    <label className="block">
      <span className="text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint">
        {label(name)}
      </span>
      <input
        type="number"
        value={value ?? 0}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        className="mt-1.5 w-full rounded-lg border border-pine-600/15 bg-white px-3 py-2.5 text-[14.5px] outline-none focus:border-pine-600 focus:ring-2 focus:ring-pine-600/15"
      />
    </label>
  );
}

function BoolField({ name, value, onChange }) {
  return (
    <label className="flex items-center gap-2.5 py-2">
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-pine-600/30 accent-[#005902]"
      />
      <span className="text-[14px] font-medium text-ink">{label(name)}</span>
    </label>
  );
}

function StringList({ name, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const set = (i, v) => onChange(items.map((x, k) => (k === i ? v : x)));
  return (
    <div>
      <span className="text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint">
        {label(name)}
      </span>
      <div className="mt-1.5 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item ?? ""}
              onChange={(e) => set(i, e.target.value)}
              className="w-full rounded-lg border border-pine-600/15 bg-white px-3 py-2 text-[14px] outline-none focus:border-pine-600"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, k) => k !== i))}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-maroon-600/20 text-maroon-600 hover:bg-maroon-600/5"
              aria-label="Remove"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="inline-flex items-center gap-1.5 rounded-lg border border-pine-600/25 px-3 py-1.5 text-[13px] font-semibold text-pine-700 hover:bg-pine-50"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
    </div>
  );
}

function ObjectList({ name, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const sample = items[0] || {};

  const setItem = (i, v) => onChange(items.map((x, k) => (k === i ? v : x)));
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const title = (item, i) =>
    item?.title || item?.name || item?.label || item?.q || item?.region || item?.group || `Item ${i + 1}`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint">
          {label(name)} <span className="text-ink-faint/70">({items.length})</span>
        </span>
      </div>

      <div className="mt-2 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl border border-pine-600/15 bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-2 border-b border-pine-600/10 pb-2.5">
              <span className="truncate font-display text-[14px] font-bold text-ink">
                {title(item, i)}
              </span>
              <span className="flex shrink-0 items-center gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0}
                  className="grid h-7 w-7 place-items-center rounded border border-pine-600/20 text-pine-700 disabled:opacity-25" aria-label="Move up">
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1}
                  className="grid h-7 w-7 place-items-center rounded border border-pine-600/20 text-pine-700 disabled:opacity-25" aria-label="Move down">
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => onChange(items.filter((_, k) => k !== i))}
                  className="grid h-7 w-7 place-items-center rounded border border-maroon-600/20 text-maroon-600 hover:bg-maroon-600/5" aria-label="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </span>
            </div>
            <Fields data={item} onChange={(v) => setItem(i, v)} />
          </div>
        ))}

        <button
          type="button"
          onClick={() => onChange([...items, blankFrom(sample)])}
          className="inline-flex items-center gap-1.5 rounded-lg border border-pine-600/25 px-3 py-2 text-[13px] font-semibold text-pine-700 hover:bg-pine-50"
        >
          <Plus className="h-3.5 w-3.5" /> Add {label(name).replace(/s$/, "")}
        </button>
      </div>
    </div>
  );
}

/* ── recursive field renderer ──────────────────────────────── */

function Fields({ data, onChange }) {
  const set = (key, v) => onChange({ ...data, [key]: v });

  if (data === null || typeof data !== "object") return null;

  return (
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => {
        if (Array.isArray(value)) {
          const objectArray = value.length > 0 && value[0] !== null && typeof value[0] === "object";
          return objectArray ? (
            <ObjectList key={key} name={key} value={value} onChange={(v) => set(key, v)} />
          ) : (
            <StringList key={key} name={key} value={value} onChange={(v) => set(key, v)} />
          );
        }
        if (value !== null && typeof value === "object") {
          return (
            <fieldset key={key} className="rounded-xl border border-pine-600/15 bg-[#fbfcfb] p-4">
              <legend className="px-1 text-[11.5px] font-semibold uppercase tracking-wider text-pine-700">
                {label(key)}
              </legend>
              <Fields data={value} onChange={(v) => set(key, v)} />
            </fieldset>
          );
        }
        if (typeof value === "number") {
          return <NumberField key={key} name={key} value={value} onChange={(v) => set(key, v)} />;
        }
        if (typeof value === "boolean") {
          return <BoolField key={key} name={key} value={value} onChange={(v) => set(key, v)} />;
        }
        return <TextField key={key} name={key} value={value} onChange={(v) => set(key, v)} />;
      })}
    </div>
  );
}

/* ── main editor ───────────────────────────────────────────── */

export default function SectionEditor({ sectionKey, title, description, initial }) {
  const [data, setData] = useState(() => clone(initial));
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [raw, setRaw] = useState(false);
  const [rawText, setRawText] = useState(() => JSON.stringify(initial, null, 2));
  const [rawError, setRawError] = useState("");

  const save = useCallback(async () => {
    let payload = data;
    if (raw) {
      try {
        payload = JSON.parse(rawText);
      } catch (e) {
        setRawError("JSON theek nahi hai: " + e.message);
        return;
      }
      setRawError("");
      setData(payload);
    }
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: sectionKey, data: payload }),
      });
      const json = await res.json().catch(() => ({}));
      setStatus(res.ok ? { ok: true } : { ok: false, msg: json.error || "Save nahi hua." });
    } catch {
      setStatus({ ok: false, msg: "Server se rabta nahi ho saka." });
    }
    setBusy(false);
  }, [data, raw, rawText, sectionKey]);

  const toggleRaw = () => {
    if (!raw) setRawText(JSON.stringify(data, null, 2));
    else {
      try {
        setData(JSON.parse(rawText));
        setRawError("");
      } catch (e) {
        setRawError("JSON theek nahi hai: " + e.message);
        return;
      }
    }
    setRaw(!raw);
  };

  const isList = Array.isArray(data);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">{title}</h1>
          {description && <p className="mt-1 text-[14px] text-ink-soft">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleRaw}
            className="inline-flex items-center gap-1.5 rounded-lg border border-pine-600/25 px-3 py-2 text-[13px] font-semibold text-pine-700 hover:bg-pine-50"
          >
            {raw ? <LayoutList className="h-3.5 w-3.5" /> : <Code2 className="h-3.5 w-3.5" />}
            {raw ? "Form view" : "Code view"}
          </button>
          <button onClick={save} disabled={busy} className="btn-primary px-5 py-2.5 text-[13.5px] disabled:opacity-60">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {status && (
        <p
          className={
            "mb-5 flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13.5px] " +
            (status.ok ? "bg-pine-600/10 text-pine-800" : "bg-maroon-600/10 text-maroon-700")
          }
        >
          {status.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {status.ok ? "Save ho gaya. Website par live hai." : status.msg}
        </p>
      )}

      {raw ? (
        <div>
          {rawError && <p className="mb-3 text-[13px] text-maroon-600">{rawError}</p>}
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            spellCheck={false}
            className="h-[60vh] w-full rounded-xl border border-pine-600/15 bg-white p-4 font-mono text-[12.5px] leading-relaxed outline-none focus:border-pine-600"
          />
        </div>
      ) : isList ? (
        <ObjectList name={sectionKey} value={data} onChange={setData} />
      ) : (
        <Fields data={data} onChange={setData} />
      )}
    </div>
  );
}
