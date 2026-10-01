// Talks to server/api.mjs (proxied by nginx at /api on the VPS).
// NEXT_PUBLIC_API_BASE lets local dev point at a separately running API.
const BASE = process.env.NEXT_PUBLIC_API_BASE || "";

async function handle<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || "Something went wrong. Please try again.");
  return data as T;
}

export function apiGet<T>(path: string): Promise<T> {
  return fetch(BASE + path, { cache: "no-store" }).then((r) => handle<T>(r));
}

export function apiPostForm<T>(path: string, form: FormData): Promise<T> {
  return fetch(BASE + path, { method: "POST", body: form }).then((r) => handle<T>(r));
}

export function apiPostJson<T>(path: string, body: unknown): Promise<T> {
  return fetch(BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => handle<T>(r));
}

export const publicFileUrl = (name: string) => `${BASE}/api/files/public/${encodeURIComponent(name)}`;

export interface Job {
  id: string;
  title: string;
  category: string;
  city: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
  phone: string;
  email: string;
  linkedin: string;
}
