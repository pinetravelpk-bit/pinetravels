// Seamless infinite marquee. Renders the children twice so the loop
// is continuous. Pauses on hover; respects prefers-reduced-motion.
export default function Marquee({ children, speed = "normal", reverse = false, className = "" }) {
  const track = speed === "fast" ? "marquee-fast" : "marquee-track";
  return (
    <div className={`marquee-wrap relative overflow-hidden ${className}`}>
      <div className={`flex w-max ${track} ${reverse ? "marquee-reverse" : ""}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
