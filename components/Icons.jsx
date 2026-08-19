import {
  Clapperboard,
  Palette,
  Sparkles,
  Megaphone,
  Share2,
  Code2,
  Target,
  Zap,
  ShieldCheck,
  Video,
} from "lucide-react";

// Maps the `icon` keys used in lib/site.js to lucide icons.
const MAP = {
  video: Clapperboard,
  palette: Palette,
  spark: Sparkles,
  megaphone: Megaphone,
  share: Share2,
  code: Code2,
  target: Target,
  bolt: Zap,
  shield: ShieldCheck,
};

export default function Icon({ name, className = "h-6 w-6", strokeWidth = 1.8 }) {
  const Cmp = MAP[name] || Video;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
