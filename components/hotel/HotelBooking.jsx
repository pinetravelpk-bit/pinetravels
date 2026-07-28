"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Users, BedDouble, Maximize2, CalendarDays, CheckCircle2, MessageCircle, Home, Images, ChevronRight } from "lucide-react";
import { CardScene } from "../Scenery";
import RoomModal from "./RoomModal";
import { formatPKR } from "../../lib/hotels";
import { site } from "../../lib/data";

const typeLabel = { room: "Room", suite: "Suite", cottage: "Cottage" };
const todayISO = (o = 0) => { const d = new Date(); d.setDate(d.getDate() + o); return d.toISOString().slice(0, 10); };
const nightsBetween = (a, b) => { const diff = Math.round((new Date(b) - new Date(a)) / 86400000); return diff > 0 ? diff : 0; };

export default function HotelBooking({ hotel }) {
  const [checkIn, setCheckIn] = useState(todayISO(0));
  const [checkOut, setCheckOut] = useState(todayISO(2));
  const [guests, setGuests] = useState(2);
  const [qty, setQty] = useState({});
  const [done, setDone] = useState(false);
  const [modalRoom, setModalRoom] = useState(null);

  const nights = nightsBetween(checkIn, checkOut);
  const selected = useMemo(
    () => hotel.rooms.map((r) => ({ ...r, count: qty[r.id] || 0 })).filter((r) => r.count > 0),
    [hotel.rooms, qty]
  );
  const roomsPerNight = selected.reduce((s, r) => s + r.price * r.count, 0);
  const subtotal = roomsPerNight * nights;
  const offer = hotel.offer;
  const offerApplies = offer && nights >= (offer.minNights || 1) && subtotal > 0;
  const discount = offerApplies ? Math.round((subtotal * offer.discountPct) / 100) : 0;
  const total = subtotal - discount;
  const totalRooms = selected.reduce((s, r) => s + (r.type === "cottage" ? r.roomCount || 1 : 1) * r.count, 0);
  const setCount = (id, n) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(20, n)) }));

  const reserve = () => {
    if (selected.length === 0 || nights === 0) return;
    const lines = selected
      .map((r) => `• ${r.name} (${typeLabel[r.type]}${r.type === "cottage" ? `, ${r.roomCount} rooms` : ""}) x${r.count} — ${formatPKR(r.price)}/night`)
      .join("%0A");
    const text =
      `Assalam-o-Alaikum Pine Travel!%0A%0AI'd like to book at *${hotel.name}* (${hotel.location}).%0A%0A` +
      `Check-in: ${checkIn}%0ACheck-out: ${checkOut}%0ANights: ${nights}%0AGuests: ${guests}%0A%0A` +
      `Selected:%0A${lines}%0A%0A` +
      (offerApplies ? `Offer ${offer.code} (-${offer.discountPct}%) applied%0A` : ``) +
      `Estimated total: ${formatPKR(total)}%0A%0APlease confirm availability.`;
    window.open(`${site.whatsappHref}?text=${text}`, "_blank");
    setDone(true);
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <>
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-5">
        {hotel.rooms.map((r) => {
          const count = qty[r.id] || 0;
          return (
            <article key={r.id} className={`overflow-hidden rounded-2xl border bg-white shadow-card transition-colors ${count > 0 ? "border-pine-600/40 ring-1 ring-pine-600/20" : "border-pine-600/10"}`}>
              <div className="grid sm:grid-cols-[200px_1fr]">
                <button type="button" onClick={() => setModalRoom(r)} className="group relative h-40 w-full overflow-hidden text-left sm:h-full" aria-label={`View photos and details for ${r.name}`}>
                  {r.photos?.length ? (
                    <img src={r.photos[0]} alt={r.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <CardScene tone={r.tone} className="h-full w-full" />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-pine-700 backdrop-blur">{typeLabel[r.type]}</span>
                  {r.photos?.length > 1 && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink/55 px-2 py-1 text-[10.5px] font-semibold text-cream backdrop-blur"><Images className="h-3 w-3" /> {r.photos.length}</span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-ink/45 py-2 text-[12px] font-semibold text-cream opacity-0 backdrop-blur transition group-hover:opacity-100">
                    <Images className="h-3.5 w-3.5" /> View photos &amp; details
                  </span>
                </button>
                <div className="flex flex-col p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <button type="button" onClick={() => setModalRoom(r)} className="text-left font-display text-lg font-bold text-ink transition hover:text-pine-700">{r.name}</button>
                      {r.type === "cottage" && (
                        <p className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-maroon-600"><Home className="h-3.5 w-3.5" /> Includes {r.roomCount} rooms</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-display text-xl font-extrabold text-pine-700">{formatPKR(r.price)}</div>
                      <div className="text-[11px] uppercase tracking-wider text-ink-faint">/ night</div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-[13px] text-ink-soft">
                    <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-pine-600" /> {r.guests} guests</span>
                    <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-pine-600" /> {r.beds}</span>
                    <span className="inline-flex items-center gap-1.5"><Maximize2 className="h-4 w-4 text-pine-600" /> {r.size}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.amenities.map((a) => (<span key={a} className="rounded-full bg-pine-50 px-2.5 py-1 text-[11.5px] font-medium text-pine-700">{a}</span>))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-pine-600/10 pt-4">
                    <button type="button" onClick={() => setModalRoom(r)} className="inline-flex items-center gap-1 text-[13px] font-semibold text-pine-700 transition hover:text-pine-800">
                      {count > 0 ? `${count} selected · details` : "View details & book"} <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setCount(r.id, count - 1)} disabled={count === 0} className="grid h-9 w-9 place-items-center rounded-full border border-pine-600/20 text-pine-700 transition hover:bg-pine-50 disabled:opacity-30" aria-label={`Remove one ${r.name}`}><Minus className="h-4 w-4" /></button>
                      <span className="w-6 text-center font-display text-lg font-bold text-ink">{count}</span>
                      <button onClick={() => setCount(r.id, count + 1)} className="grid h-9 w-9 place-items-center rounded-full bg-pine-600 text-cream transition hover:bg-pine-700" aria-label={`Add one ${r.name}`}><Plus className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-pine-600/10 bg-white p-6 shadow-card">
          <h3 className="font-display text-lg font-extrabold text-ink">Your booking</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="rounded-xl border border-pine-600/15 bg-cream px-3 py-2.5">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-faint"><CalendarDays className="h-3.5 w-3.5" /> Check-in</span>
              <input type="date" value={checkIn} min={todayISO(0)} onChange={(e) => { setCheckIn(e.target.value); if (nightsBetween(e.target.value, checkOut) === 0) { const d = new Date(e.target.value); d.setDate(d.getDate() + 1); setCheckOut(d.toISOString().slice(0, 10)); } }} className="mt-1 w-full bg-transparent text-[14px] font-semibold text-ink outline-none" />
            </label>
            <label className="rounded-xl border border-pine-600/15 bg-cream px-3 py-2.5">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-faint"><CalendarDays className="h-3.5 w-3.5" /> Check-out</span>
              <input type="date" value={checkOut} min={todayISO(1)} onChange={(e) => setCheckOut(e.target.value)} className="mt-1 w-full bg-transparent text-[14px] font-semibold text-ink outline-none" />
            </label>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl border border-pine-600/15 bg-cream px-3 py-2.5">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-soft"><Users className="h-4 w-4 text-pine-600" /> Guests</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid h-7 w-7 place-items-center rounded-full border border-pine-600/20 text-pine-700 hover:bg-pine-50" aria-label="Fewer guests"><Minus className="h-3.5 w-3.5" /></button>
              <span className="w-5 text-center font-display font-bold">{guests}</span>
              <button onClick={() => setGuests((g) => Math.min(40, g + 1))} className="grid h-7 w-7 place-items-center rounded-full bg-pine-600 text-cream hover:bg-pine-700" aria-label="More guests"><Plus className="h-3.5 w-3.5" /></button>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[13px] text-ink-soft">
            <span>{nights > 0 ? `${nights} night${nights > 1 ? "s" : ""}` : "Select valid dates"}</span>
            <span>{totalRooms > 0 ? `${totalRooms} room${totalRooms > 1 ? "s" : ""} total` : "—"}</span>
          </div>
          <div className="mt-4 border-t border-pine-600/10 pt-4">
            {selected.length === 0 ? (
              <p className="text-[13.5px] text-ink-faint">Pick rooms or cottages on the left to build your stay.</p>
            ) : (
              <ul className="space-y-2">
                {selected.map((r) => (
                  <li key={r.id} className="flex justify-between text-[13.5px]">
                    <span className="text-ink-soft">{r.name} <span className="text-ink-faint">×{r.count}</span></span>
                    <span className="font-semibold text-ink">{formatPKR(r.price * r.count * Math.max(nights, 1))}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selected.length > 0 && (
            <div className="mt-4 space-y-1.5 border-t border-pine-600/10 pt-4 text-[13.5px]">
              <div className="flex justify-between text-ink-soft"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
              {offerApplies && (<div className="flex justify-between text-maroon-600"><span>Offer {offer.code} (−{offer.discountPct}%)</span><span>−{formatPKR(discount)}</span></div>)}
              {offer && !offerApplies && (<p className="text-[12px] text-ink-faint">Stay {offer.minNights}+ nights to unlock {offer.discountPct}% off ({offer.code}).</p>)}
              <div className="flex justify-between pt-1 font-display text-lg font-extrabold text-ink"><span>Total</span><span className="text-pine-700">{formatPKR(total)}</span></div>
            </div>
          )}
          <button onClick={reserve} disabled={selected.length === 0 || nights === 0} className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-40">
            <MessageCircle className="h-4 w-4" /> Reserve on WhatsApp
          </button>
          {done && (<p className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-pine-700"><CheckCircle2 className="h-4 w-4" /> Opening WhatsApp with your booking…</p>)}
          <p className="mt-3 text-[12px] text-ink-faint">No prepayment here — we confirm availability and price with you first.</p>
        </div>
      </aside>
    </div>
    <RoomModal room={modalRoom} hotel={hotel} open={!!modalRoom} onClose={() => setModalRoom(null)} />
    </>
  );
}
