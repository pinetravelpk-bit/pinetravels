"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Loader2, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Login nahi ho saka.");
        setBusy(false);
        return;
      }
      router.replace(params.get("next") || "/admin");
      router.refresh();
    } catch {
      setError("Server se rabta nahi ho saka. Dobara koshish karein.");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-2xl bg-cream p-6 shadow-lift">
      {error && (
        <p className="mb-4 flex items-start gap-2 rounded-lg bg-maroon-600/10 px-3 py-2.5 text-[13.5px] text-maroon-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <label className="block">
        <span className="text-[12px] font-semibold uppercase tracking-wider text-ink-faint">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          className="mt-1.5 w-full rounded-xl border border-pine-600/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-pine-600 focus:ring-2 focus:ring-pine-600/20"
        />
      </label>

      <label className="mt-4 block">
        <span className="text-[12px] font-semibold uppercase tracking-wider text-ink-faint">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-xl border border-pine-600/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-pine-600 focus:ring-2 focus:ring-pine-600/20"
        />
      </label>

      <button type="submit" disabled={busy} className="btn-primary mt-6 w-full disabled:opacity-60">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
        {busy ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
