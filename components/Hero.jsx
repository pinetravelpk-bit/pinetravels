"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, MapPin, ChevronDown, CalendarDays, Users, BedDouble, Car, Compass, Route } from "lucide-react";
import { MountainScene, PineMark } from "./Scenery";
import {
  site, hero as heroContent, destinations, quickSearch,
  tourTypes, travellerOptions, guestOptions, vehicles, pickupCities, durations,
} from "../lib/data";
import { hotels } from "../lib/hotels";

const TABS = [
  { id: "tours", label: "Tours", Icon: Compass },
  { id: "hotels", label: "Hotels", Icon: BedDouble },
  { id: "rent", label: "Rent", Icon: Car },
];

const iso = (o = 0) => { const d = new Date(); d.setDate(d.getDate() + o); return d.toISOString().slice(0, 10); };

export default function Hero() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [videoOk, setVideoOk] = useState(false);
  const [tab, setTab] = useState("tours");

  const [tour, setTour] = useState({ dest: destinations[0].name, date: iso(7), type: tourTypes[0], people: travellerOptions[1] });
  const [stay, setStay] = useState({ hotel: "any", checkIn: iso(0), checkOut: iso(2), guests: guestOptions[1] });
  const [rent, setRent] = useState({ vehicle: vehicles[0], city: pickupCities[0], date: iso(3), days: durations[2] });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const ok = () => setVideoOk(true);
    v.addEventListener("loadeddata", ok);
    v.play().catch(() => {});
    return () => v.removeEventListener("loadeddata", ok);
  }, []);

  const wa = (t) => window.open(site.whatsappHref + "?text=" + encodeURIComponent(t), "_blank");

  const onSearch = () => {
    if (tab === "hotels") {
      router.push(stay.hotel === "any" ? "/hotels" : "/hotels/" + stay.hotel + "#booking");
      return;
    }
    if (tab === "tours") {
      wa("Assalam-o-Alaikum Pine Travel!\n\nI'm looking for a tour.\nDestination: " + tour.dest +
        "\nDeparture: " + tour.date + "\nTour type: " + tour.type + "\nTravellers: " + tour.people +
        "\n\nPlease share packages and pricing.");
      return;
    }
    wa("Assalam-o-Alaikum Pine Travel!\n\nI'd like to rent a vehicle.\nVehicle: " + rent.vehicle +
      "\nPickup city: " + rent.city + "\nPickup date: " + rent.date + "\nDuration: " + rent.days +
      "\n\nPlease share rates and availability.");
  };

  return (
    <section className="relative overflow-hidden bg-pine-900 text-cream">
      {/* Video layer — falls back to illustrated scene if no file */}
      <div className="absolute inset-0">
        <MountainScene className="absolute inset-x-0 bottom-0 h-[80%] w-full" />
        {heroContent.video && (
          <video
            ref={videoRef}
            className={"absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 " + (videoOk ? "opacity-100" : "opacity-0")}
            src={heroContent.video}
            poster={heroContent.poster || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        )}
      </div>

      {/* Gradient scrims for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-pine-900/85 via-pine-800/55 to-pine-900/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-pine-900/80 via-transparent to-transparent" />
      <div className="contour absolute inset-0" />

      {/* Quick search strip */}
      <div className="relative border-b border-white/10">
        <div className="container-x flex items-center gap-x-5 gap-y-1 overflow-x-auto py-2.5 text-[12.5px] text-cream/70 rail">
          <span className="shrink-0 font-semibold text-cream/90">Quick Search:</span>
          {quickSearch.map((q) => (
            <Link key={q} href="/#packages" className="shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:text-white hover:underline">
              {q}
            </Link>
          ))}
        </div>
      </div>

      <div className="container-x relative pb-16 pt-14 lg:pb-20 lg:pt-20">
        <div className="max-w-2xl">
          <span className="eyebrow text-pine-200">
            <PineMark className="h-3.5 w-3.5 text-pine-200" />
            Rawalpindi · Northern Pakistan Specialists
          </span>
          <h1 className="mt-5 font-display text-[42px] font-extrabold leading-[0.98] drop-shadow-sm sm:text-6xl lg:text-[66px]">
            All-in-one{" "}
            <span className="bg-gradient-to-r from-cream via-pine-100 to-pine-200 bg-clip-text text-transparent">
              Northern
            </span>{" "}
            Travel.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-cream/85 sm:text-lg">{heroContent.sub}</p>
        </div>

        {/* Tabbed search */}
        <div className="mt-10 sm:mt-12">
          <div className="flex flex-wrap gap-2">
            {TABS.map(({ id, label, Icon }) => {
              const active = tab === id;
              return (
                <button key={id} type="button" onClick={() => setTab(id)} aria-pressed={active}
                  className={"inline-flex items-center gap-2.5 rounded-full py-2 pl-2 pr-5 font-body text-[14.5px] font-semibold transition-all duration-200 " +
                    (active ? "grad-cream text-pine-800 shadow-lift" : "border border-white/20 bg-white/10 text-cream/85 backdrop-blur hover:bg-white/20")}>
                  <span className={"grid h-8 w-8 place-items-center rounded-full transition-colors " + (active ? "grad-pine text-cream" : "bg-white/15 text-cream")}>
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  {label}
                </button>
              );
            })}
          </div>

          <div className="grad-cream mt-3 rounded-2xl p-4 text-ink shadow-lift sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
              {tab === "tours" && (
                <>
                  <Field icon={<MapPin className="h-5 w-5" />} label="Destination">
                    <Select value={tour.dest} onChange={(v) => setTour({ ...tour, dest: v })} options={destinations.map((d) => d.name)} aria="Destination" />
                  </Field>
                  <Field icon={<CalendarDays className="h-5 w-5" />} label="Departure date">
                    <DateInput value={tour.date} min={iso(0)} onChange={(v) => setTour({ ...tour, date: v })} aria="Departure date" />
                  </Field>
                  <Field icon={<Route className="h-5 w-5" />} label="Tour type">
                    <Select value={tour.type} onChange={(v) => setTour({ ...tour, type: v })} options={tourTypes} aria="Tour type" />
                  </Field>
                  <Field icon={<Users className="h-5 w-5" />} label="Travellers">
                    <Select value={tour.people} onChange={(v) => setTour({ ...tour, people: v })} options={travellerOptions} aria="Travellers" />
                  </Field>
                </>
              )}

              {tab === "hotels" && (
                <>
                  <Field icon={<BedDouble className="h-5 w-5" />} label="Hotel or area">
                    <Select value={stay.hotel} onChange={(v) => setStay({ ...stay, hotel: v })}
                      options={[{ value: "any", label: "All hotels" }].concat(hotels.map((h) => ({ value: h.slug, label: h.name })))} aria="Hotel" />
                  </Field>
                  <Field icon={<CalendarDays className="h-5 w-5" />} label="Check-in">
                    <DateInput value={stay.checkIn} min={iso(0)} aria="Check-in date"
                      onChange={(v) => {
                        const n = new Date(v); n.setDate(n.getDate() + 1);
                        const nISO = n.toISOString().slice(0, 10);
                        setStay((s) => ({ ...s, checkIn: v, checkOut: s.checkOut > v ? s.checkOut : nISO }));
                      }} />
                  </Field>
                  <Field icon={<CalendarDays className="h-5 w-5" />} label="Check-out">
                    <DateInput value={stay.checkOut} min={iso(1)} onChange={(v) => setStay({ ...stay, checkOut: v })} aria="Check-out date" />
                  </Field>
                  <Field icon={<Users className="h-5 w-5" />} label="Guests">
                    <Select value={stay.guests} onChange={(v) => setStay({ ...stay, guests: v })} options={guestOptions} aria="Guests" />
                  </Field>
                </>
              )}

              {tab === "rent" && (
                <>
                  <Field icon={<Car className="h-5 w-5" />} label="Vehicle">
                    <Select value={rent.vehicle} onChange={(v) => setRent({ ...rent, vehicle: v })} options={vehicles} aria="Vehicle" />
                  </Field>
                  <Field icon={<MapPin className="h-5 w-5" />} label="Pickup city">
                    <Select value={rent.city} onChange={(v) => setRent({ ...rent, city: v })} options={pickupCities} aria="Pickup city" />
                  </Field>
                  <Field icon={<CalendarDays className="h-5 w-5" />} label="Pickup date">
                    <DateInput value={rent.date} min={iso(0)} onChange={(v) => setRent({ ...rent, date: v })} aria="Pickup date" />
                  </Field>
                  <Field icon={<Users className="h-5 w-5" />} label="Duration">
                    <Select value={rent.days} onChange={(v) => setRent({ ...rent, days: v })} options={durations} aria="Duration" />
                  </Field>
                </>
              )}

              <button onClick={onSearch} className="btn-primary h-full min-h-[58px] w-full px-8 sm:col-span-2 lg:col-span-1 lg:w-auto lg:rounded-xl">
                <Search className="h-4 w-4" /> Search
              </button>
            </div>

            <p className="mt-4 text-[13.5px] text-ink-soft">
              {tab === "hotels" ? (
                <>Rooms, suites and whole cottages — pick several at once, for as many nights as you like.{" "}
                  <Link href="/hotels" className="font-semibold text-maroon-600 underline-offset-4 hover:underline">Browse all hotels</Link></>
              ) : (
                <>Can&rsquo;t find what you&rsquo;re looking for?{" "}
                  <Link href="/contact" className="font-semibold text-maroon-600 underline-offset-4 hover:underline">Create a custom itinerary</Link></>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ icon, label, children }) {
  return (
    <label className="grad-card flex items-center gap-3 rounded-xl border border-pine-600/15 px-3.5 py-2.5 transition-colors hover:border-pine-600/40 focus-within:border-pine-600 focus-within:ring-2 focus-within:ring-pine-600/15">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-pine-50 to-mist text-pine-700">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="relative flex items-center">{children}</span>
        <span className="mt-0.5 block text-[11.5px] font-medium uppercase tracking-wider text-ink-faint">{label}</span>
      </span>
    </label>
  );
}

function Select({ value, onChange, options, aria }) {
  const items = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <>
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={aria}
        className="w-full appearance-none truncate bg-transparent pr-5 font-display text-[15px] font-bold text-ink outline-none">
        {items.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-ink-faint" />
    </>
  );
}

function DateInput({ value, min, onChange, aria }) {
  return (
    <input type="date" value={value} min={min} onChange={(e) => onChange(e.target.value)} aria-label={aria}
      className="w-full bg-transparent font-display text-[15px] font-bold text-ink outline-none" />
  );
}
