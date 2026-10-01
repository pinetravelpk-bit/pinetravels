import { NextResponse } from "next/server";
import { addSubmission, saveCv } from "@/lib/store";

export const runtime = "nodejs";

// Fields accepted per form. Anything else in the request is ignored.
const FORMS = {
  candidate: { required: ["name", "phone", "role"], optional: ["email", "city", "experience", "licence", "job", "message"] },
  employer: { required: ["name", "organisation", "phone", "role"], optional: ["email", "city", "positions", "startDate", "message"] },
  contact: { required: ["name", "phone", "message"], optional: ["email", "subject"] },
};

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (form.get("website")) return NextResponse.json({ ok: true });

  const type = String(form.get("type") || "");
  const spec = FORMS[type];
  if (!spec) return NextResponse.json({ error: "Unknown form." }, { status: 400 });

  const fields = {};
  for (const key of [...spec.required, ...spec.optional]) {
    const value = String(form.get(key) || "").trim().slice(0, 2000);
    if (value) fields[key] = value;
  }
  const missing = spec.required.filter((key) => !fields[key]);
  if (missing.length) {
    return NextResponse.json({ error: `Please fill in: ${missing.join(", ")}.` }, { status: 400 });
  }

  let cv;
  const file = form.get("cv");
  if (type === "candidate" && file && typeof file === "object" && file.size > 0) {
    try {
      cv = { stored: await saveCv(file), original: file.name };
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  }

  await addSubmission({ type, fields, ...(cv && { cv }) });
  return NextResponse.json({ ok: true });
}
