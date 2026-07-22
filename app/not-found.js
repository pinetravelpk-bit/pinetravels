import Link from "next/link";
import { MountainScene } from "../components/Scenery";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden grad-pine text-cream">
      <MountainScene className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 w-full opacity-40" />
      <div className="container-x relative text-center">
        <p className="eyebrow justify-center text-pine-200">Off the map</p>
        <h1 className="mt-4 font-display text-6xl font-extrabold sm:text-8xl">404</h1>
        <p className="mx-auto mt-4 max-w-md text-cream/80">
          This trail doesn&apos;t lead anywhere. Let&apos;s get you back to the mountains.
        </p>
        <Link href="/" className="btn-primary mt-8">Back to home</Link>
      </div>
    </section>
  );
}
