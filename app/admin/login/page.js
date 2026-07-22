import { Suspense } from "react";
import LoginForm from "../../../components/admin/LoginForm";

export const metadata = { title: "Login — Pine Travel Admin", robots: { index: false } };

export default function LoginPage() {
  return (
    <div className="grad-pine flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-cream">
            <img src="/images/pine-travel-logo.png" alt="Pine Travel" className="h-12 w-12 object-contain" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-extrabold text-cream">Pine Travel Admin</h1>
          <p className="mt-1 text-[14px] text-cream/70">Website manage karne ke liye login karein</p>
        </div>
        <Suspense fallback={<div className="h-64 rounded-2xl bg-cream/60" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
