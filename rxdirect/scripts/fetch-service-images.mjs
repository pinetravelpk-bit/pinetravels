// Downloads the service photos listed in data/serviceImageSources.json (free
// Pexels photos, no attribution required) into public/images/services/photos.
// Runs before every build. Photos already on disk are kept, and a failed
// download is only logged: content/settings/images.json points at these files,
// and data/siteImages.ts falls back to the default photo for any that are missing.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const sources = JSON.parse(readFileSync(join(root, "data/serviceImageSources.json"), "utf8"));
const dir = join(root, "public/images/services/photos");
mkdirSync(dir, { recursive: true });

let fetched = 0;
let missing = 0;
for (const [slug, { pexelsId }] of Object.entries(sources)) {
  const file = join(dir, `${slug}.jpg`);
  if (existsSync(file)) continue;
  const url = `https://images.pexels.com/photos/${pexelsId}/pexels-photo-${pexelsId}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { "User-Agent": "rxdirect-build" } });
    const type = res.headers.get("content-type") || "";
    const body = Buffer.from(await res.arrayBuffer());
    if (!res.ok || !type.startsWith("image/") || body.length < 10_000) throw new Error(`${res.status} ${type} ${body.length} bytes`);
    writeFileSync(file, body);
    fetched++;
  } catch (err) {
    missing++;
    console.log(`service photo for ${slug} not downloaded (${err.message}); using the default photo`);
  }
}
console.log(`service photos: ${fetched} downloaded, ${missing} unavailable`);
