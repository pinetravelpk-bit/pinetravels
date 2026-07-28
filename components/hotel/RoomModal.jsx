"use client";

import { useEffect, useState, useCallback } from "react";
import {
  X, ChevronLeft, ChevronRight, Users, BedDouble, Maximize2, Home,
  CalendarDays, Minus, Plus, MessageCircle, CheckCircle2, ImageIcon,
} from "lucide-react";
import { CardScene } from "../Scenery";
import { formatPKR } from "../../lib/hotels";
import { site } from "../../lib/data";

const typeLabel = { room: "Room", suite: "Suite", cottage: "Cottage" };
const todayISO = (o = 0) => { const d = new Date(); d.setDate(d.getDate() + o); return d.toISOString().slice(0, 10); };
const nightsBetween = (a, b) => { const diff = Math.round((new Date(b) - new Date(a)) / 86400000); return diff > 0 ? diff : 0; };

// Popup for a single room: photo gallery + full details + a booking form
// scoped to just this room. Falls back to the illustrated CardScene tile when
// no real photos have been added yet (room.photos empty/undefined).
export default function RoomModal({ room, hotel, open, onClose }) {
  const [idx, setIdx] = useState(0);
  const [checkIn, setCheckIn] = useState(todayISO(0));
  const [checkOut, setCheckOut] = useState(todayISO(2));
  const [guests, setGuests] = useState(2);
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);

  const photos = room?.photos || [];
  const hasPhotos = photos.length > 0;

  const next = useCallback(() => setIdx((i) => (i + 1) % (photos.length || 1)), [photos.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + (photos.length || 1)) % (photos.length || 1)), [photos.length]);

  // Reset gallery + form each time a new room opens.
  useEffect(() => {
    if (open) {
      setIdx(0);
      setGuests(Math.min(room?.guests || 2, 2) || 2);
      setQty(1);
      setDone(false);
    }
  }, [open, room]);

  // Esc to close, arrows to navigate, and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && hasPhotos) next();
      else if (e.key === "ArrowLeft" && hasPhotos) prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, next, prev, hasPhotos]);

  if (!open || !room) return null;

  const nights = nightsBetween(checkIn, checkOut);
  const isCottage = room.type === "cottage";
  const perNight = room.price * qty;
  const subtotal = perNight * nights;
  const offer = hotel?.offer;
  const offerApplies = offer && nights >= (offer.minNights || 1) && subtotal > 0;
  const discount = offerApplies ? Math.round((subtotal * offer.discountPct) / 100) : 0;
  const total = subtotal - discount;

  const reserve = () => {
    if (nights === 0) return;
    const text =
      `Assalam-o-Alaikum Pine Travel!%0A%0A` +
      `I'd like to book *${room.name}* (${typeLabel[room.type]}${isCottage ? `, ${room.roomCount} rooms` : ""}) ` +
      `at *${hotel.name}* (${hotel.location}).%0A%0A` +
      `Check-in: ${checkIn}%0ACheck-out: ${checkOut}%0ANights: ${nights}%0A` +
      `Guests: ${guests}%0A${isCottage ? "Cottages" : "Rooms"}: ${qty}%0A` +
      `Price: ${formatPKR(room.price)}/night%0A` +
      (offerApplies ? `Offer ${offer.code} (-${offer.discountPct}%) applied%0A` : ``) +
      `%0AEstimated total: ${formatPKR(total)}%0A%0APlease confirm availability.`;
    window.open(`${site.whatsappHref}?text=${text}`, "_blank");
    setDone(true);
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${room.name} details and booking`}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-cream shadow-lift sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-ink/50 text-cream backdrop-blur transition hover:bg-ink/70"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid flex-1 overflow-y-auto md:grid-cols-2">
          {/* ── Gallery ── */}
          <div className="flex flex-col bg-pine-800">
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[320px]">
              {hasPhotos ? (
                <img
                  src={photos[idx]}
                  alt={`${room.name} — photo ${idx + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <>
                  <CardScene tone={room.tone} className="h-full w-full" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-ink/40 py-2 text-[12px] font-medium text-cream/90 backdrop-blur">
                    <ImageIcon className="h-3.5 w-3.5" /> Photos coming soon
                  </div>
                </>
              )}
              {hasPhotos && photos.length > 1 && (
                <>
                  <button onClick={prev} className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-ink/50 text-cream backdrop-blur transition hover:bg-ink/70" aria-label="Previous photo"><ChevronLeft className="h-5 w-5" /></button>
                  <button onClick={next} className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-ink/50 text-cream backdrop-blur transition hover:bg-ink/70" aria-label="Next photo"><ChevronRight className="h-5 w-5" /></button>
                  <span className="absolute bottom-3 left-3 rounded-full bg-ink/55 px-2.5 py-1 text-[11px] font-semibold text-cream backdrop-blur">{idx + 1} / {photos.length}</span>
                </>
              )}
            </div>
            {hasPhotos && photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto bg-pine-800 p-3">
                {photos.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition ${i === idx ? "ring-cream" : "ring-transparent opacity-70 hover:opacity-100"}`}
                    aria-label={`Show photo ${i + 1}`}
                  >
                    <img src={p} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details + booking ── */}
          <div className="flex flex-col p-6 sm:p-7">
            <span className="w-fit rounded-full bg-pine-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-pine-700">{typeLabel[room.type]}</span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-ink">{room.name}</h2>
            {isCottage && (
              <p className="mt-1 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-maroon-600"><Home className="h-3.5 w-3.5" /> Whole cottage · {room.roomCount} rooms</p>
            )}

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-ink-soft">
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-pine-600" /> {room.guests} guests</span>
              <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-pine-600" /> {room.beds}</span>
              <span className="inline-flex items-center gap-1.5"><Maximize2 className="h-4 w-4 text-pine-600" /> {room.size}</span>
            </div>

            {room.description && (
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">{room.description}</p>
            )}

            {room.amenities?.length > 0 && (
              <div className="mt-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">What&apos;s included</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {room.amenities.map((a) => (<span key={a} className="rounded-full bg-pine-50 px-2.5 py-1 text-[12px] font-medium text-pine-700">{a}</span>))}
                </div>
              </div>
            )}

            {/* Per-room booking form */}
            <div className="mt-6 rounded-2xl border border-pine-600/15 bg-white p-4 shadow-card">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-[15px] font-extrabold text-ink">Book this {typeLabel[room.type].toLowerCase()}</h3>
                <div className="text-right"><span className="font-display text-lg font-extrabold text-pine-700">{formatPKR(room.price)}</span><span className="text-[11px] text-ink-faint"> / night</span></div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <label className="rounded-xl border border-pine-600/15 bg-cream px-3 py-2">
                  <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint"><CalendarDays className="h-3 w-3" /> Check-in</span>
                  <input type="date" value={checkIn} min={todayISO(0)} onChange={(e) => { setCheckIn(e.target.value); if (nightsBetween(e.target.value, checkOut) === 0) { const d = new Date(e.target.value); d.setDate(d.getDate() + 1); setCheckOut(d.toISOString().slice(0, 10)); } }} className="mt-0.5 w-full bg-transparent text-[13.5px] font-semibold text-ink outline-none" />
                </label>
                <label className="rounded-xl border border-pine-600/15 bg-cream px-3 py-2">
                  <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint"><CalendarDays className="h-3 w-3" /> Check-out</span>
                  <input type="date" value={checkOut} min={todayISO(1)} onChange={(e) => setCheckOut(e.target.value)} className="mt-0.5 w-full bg-transparent text-[13.5px] font-semibold text-ink outline-none" />
                </label>
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                <div className="flex items-center justify-between rounded-xl border border-pine-600/15 bg-cream px-3 py-2">
                  <span className="text-[12.5px] font-semibold text-ink-soft">Guests</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid h-6 w-6 place-items-center rounded-full border border-pine-600/20 text-pine-700 hover:bg-pine-50" aria-label="Fewer guests"><Minus className="h-3 w-3" /></button>
                    <span className="w-5 text-center font-display text-[15px] font-bold">{guests}</span>
                    <button onClick={() => setGuests((g) => Math.min(40, g + 1))} className="grid h-6 w-6 place-items-center rounded-full bg-pine-600 text-cream hover:bg-pine-700" aria-label="More guests"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-pine-600/15 bg-cream px-3 py-2">
                  <span className="text-[12.5px] font-semibold text-ink-soft">{isCottage ? "Cottages" : "Rooms"}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setQty((n) => Math.max(1, n - 1))} className="grid h-6 w-6 place-items-center rounded-full border border-pine-600/20 text-pine-700 hover:bg-pine-50" aria-label="Fewer"><Minus className="h-3 w-3" /></button>
                    <span className="w-5 text-center font-display text-[15px] font-bold">{qty}</span>
                    <button onClick={() => setQty((n) => Math.min(20, n + 1))} className="grid h-6 w-6 place-items-center rounded-full bg-pine-600 text-cream hover:bg-pine-700" aria-label="More"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-1 border-t border-pine-600/10 pt-3 text-[13px]">
                <div className="flex justify-between text-ink-soft"><span>{nights > 0 ? `${formatPKR(room.price)} × ${qty} × ${nights} night${nights > 1 ? "s" : ""}` : "Select valid dates"}</span><span className="font-semibold text-ink">{formatPKR(subtotal)}</span></div>
                {offerApplies && (<div className="flex justify-between text-maroon-600"><span>Offer {offer.code} (−{offer.discountPct}%)</span><span>−{formatPKR(discount)}</span></div>)}
                {offer && !offerApplies && nights > 0 && (<p className="text-[11.5px] text-ink-faint">Stay {offer.minNights}+ nights for {offer.discountPct}% off ({offer.code}).</p>)}
                <div className="flex justify-between pt-0.5 font-display text-[16px] font-extrabold text-ink"><span>Total</span><span className="text-pine-700">{formatPKR(total)}</span></div>
              </div>

              <button onClick={reserve} disabled={nights === 0} className="btn-primary mt-3 w-full disabled:cursor-not-allowed disabled:opacity-40">
                <MessageCircle className="h-4 w-4" /> Reserve on WhatsApp
              </button>
              {done && (<p className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-pine-700"><CheckCircle2 className="h-4 w-4" /> Opening WhatsApp with your booking…</p>)}
              <p className="mt-2 text-[11.5px] text-ink-faint">No prepayment here — we confirm availability &amp; price with you first.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
