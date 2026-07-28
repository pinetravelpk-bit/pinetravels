"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Settings, Image as ImageIcon, Inbox, LogOut,
  Menu, X, Home, ExternalLink, Layers, BedDouble,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/admin/sections/site", label: "Site Settings", Icon: Settings },
  { href: "/admin/sections/hero", label: "Hero & Video", Icon: Home },
  { href: "/admin/sections", label: "Page Sections", Icon: Layers, exact: true },
  { href: "/admin/hotels", label: "Hotels", Icon: BedDouble },
  { href: "/admin/media", label: "Media", Icon: ImageIcon },
  { href: "/admin/enquiries", label: "Enquiries", Icon: Inbox },
];

export default function AdminNav({ user }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const links = (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = isActive(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors " +
              (active
                ? "bg-pine-600 text-cream"
                : "text-ink-soft hover:bg-pine-50 hover:text-pine-800")
            }
          >
            <item.Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile bar */}
      <div className="flex items-center justify-between border-b border-pine-600/10 bg-white px-5 py-3 lg:hidden">
        <span className="font-display text-base font-extrabold">
          <span className="text-pine-600">PINE</span> <span className="text-maroon-600">ADMIN</span>
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-pine-600/20 text-pine-800"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <aside
        className={
          "w-full shrink-0 border-r border-pine-600/10 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 " +
          (open ? "block" : "hidden lg:block")
        }
      >
        <div className="flex h-full flex-col p-5">
          <div className="hidden items-center gap-2.5 lg:flex">
            <img src="/images/pine-travel-logo.png" alt="" className="h-9 w-9 object-contain" />
            <span className="font-display text-[15px] font-extrabold leading-tight">
              <span className="text-pine-600">PINE</span>{" "}
              <span className="text-maroon-600">ADMIN</span>
            </span>
          </div>

          <div className="mt-0 lg:mt-7">{links}</div>

          <div className="mt-auto pt-6">
            <Link
              href="/"
              target="_blank"
              className="mb-3 flex items-center gap-2 px-3 text-[13px] text-ink-faint hover:text-pine-700"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View website
            </Link>
            <div className="rounded-lg bg-[#f5f6f4] p-3">
              <p className="truncate text-[13px] font-semibold text-ink">{user?.name || "Admin"}</p>
              <p className="truncate text-[12px] text-ink-faint">{user?.email}</p>
              <form action="/api/admin/logout" method="post" className="mt-2.5">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-maroon-600 hover:underline"
                >
                  <LogOut className="h-3.5 w-3.5" /> Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
