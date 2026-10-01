import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-ink-soft">The page you're looking for doesn't exist or has moved.</p>
      <Link href="/" className="btn-primary mt-8">Back to home</Link>
    </section>
  );
}
