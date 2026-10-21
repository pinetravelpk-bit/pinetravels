// Writes content/settings/available-images.json: every file under
// public/images. data/siteImages.ts uses it to skip image overrides whose
// file is missing (so a missing upload falls back to the default photo
// instead of showing a broken image). Runs automatically before dev/build.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = join(process.cwd(), "public");
const files = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else files.push("/" + relative(root, full).split(sep).join("/"));
  }
}
walk(join(root, "images"));
files.sort();
writeFileSync(
  join(process.cwd(), "content/settings/available-images.json"),
  JSON.stringify(files, null, 0) + "\n"
);
console.log(`available-images.json: ${files.length} files`);
