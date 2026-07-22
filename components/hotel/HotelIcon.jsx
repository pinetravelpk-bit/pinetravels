import {
  Wifi, Mountain, UtensilsCrossed, Flame, Car, ConciergeBell, Bath, Zap,
  Trees, Coffee, Shirt, Bus, Waves, Sun, Compass, Users, MapPin, BedDouble,
} from "lucide-react";

const map = {
  Wifi, Mountain, UtensilsCrossed, Flame, Car, ConciergeBell, Bath, Zap,
  Trees, Coffee, Shirt, Bus, Waves, Sun, Compass, Users, MapPin, BedDouble,
};

export default function HotelIcon({ name, className }) {
  const Cmp = map[name] || Sun;
  return <Cmp className={className} strokeWidth={1.6} />;
}
