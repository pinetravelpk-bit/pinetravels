import { Marquee } from "../ui/primitives";
import BrandMark from "../visuals/BrandMark";
import { clients } from "../../lib/data";

export default function TrustBar() {
  return (
    <section className="section-tight border-y border-line bg-ink-900/60">
      <div className="container">
        <p className="mb-9 text-center text-sm uppercase tracking-[0.2em] text-faint">
          Trusted by ambitious brands worldwide
        </p>
      </div>
      <Marquee durationSeconds={34} itemClassName="mx-8">
        {clients.map((c) => (
          <BrandMark key={c} name={c} />
        ))}
      </Marquee>
    </section>
  );
}
