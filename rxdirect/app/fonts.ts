import localFont from "next/font/local";

// Self-hosted font files (app/fonts/) instead of next/font/google, this keeps
// `npm run build` fully offline and not dependent on fonts.googleapis.com being
// reachable at build time.
export const inter = localFont({
  src: "./fonts/Inter-Regular.woff2",
  weight: "400 700",
  variable: "--font-body",
  display: "swap",
});

export const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Poppins-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Poppins-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

export const notoNastaliq = localFont({
  src: "./fonts/NotoNastaliqUrdu-Regular.woff2",
  weight: "400 700",
  variable: "--font-urdu",
  display: "swap",
});
