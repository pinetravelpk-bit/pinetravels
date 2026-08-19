import Marquee from "../Marquee";
import { clients } from "../../lib/site";

export default function Clients() {
  return (
    <section className="border-y border-ink/5 bg-white py-10">
      <div className="container-x">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-eyebrow text-ink-faint">
          Trusted by ambitious brands worldwide
        </p>
        <Marquee>
          <div className="flex items-center gap-14 pr-14">
            {clients.map((name) => (
              <span
                key={name}
                className="whitespace-nowrap font-display text-2xl font-extrabold text-ink/25 transition-colors hover:text-ink/60"
              >
                {name}
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
