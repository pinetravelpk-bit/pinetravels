import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 mesh" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
      <div className="container relative text-center">
        <p className="font-display text-[26vw] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(200,249,78,0.35)] md:text-[16rem]">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">This click led nowhere</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you&apos;re after has moved or never existed. Let&apos;s get you back to growth.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            <Home size={16} /> Back home
          </Link>
          <Link href="/contact" className="btn-ghost">
            <ArrowLeft size={16} /> Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
