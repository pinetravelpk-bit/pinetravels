import { Users, HeartHandshake, Route, Briefcase, Gem, Presentation, BedDouble, Car, Home, Compass } from "lucide-react";

const map = { Users, HeartHandshake, Route, Briefcase, Gem, Presentation, BedDouble, Car, Home, Compass };

export default function ServiceIcon({ name, className }) {
  const Cmp = map[name] || Compass;
  return <Cmp className={className} strokeWidth={1.6} />;
}
