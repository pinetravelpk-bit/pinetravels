/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Google Fonts <link> ke zariye load hote hain (app/layout.js), build ke waqt nahi.
  optimizeFonts: false,

  // ─────────────────────────────────────────────────────────────
  // cPanel / shared hosting par upload karna ho to neeche ki 3
  // lines se comment hata dein, phir `npm run build` chalayein.
  // `out/` folder ban jayega — uske andar ka saara content
  // public_html me upload kar dein.
  //
  // Vercel par deploy kar rahe hain to inhe comment hi rehne dein.
  // ─────────────────────────────────────────────────────────────
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
