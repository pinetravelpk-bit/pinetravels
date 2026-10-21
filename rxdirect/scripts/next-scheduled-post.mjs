// Prints the Unix time (seconds) of the next blog post whose `publish_at` is
// still in the future, or nothing if none is scheduled. The server's update
// timer rebuilds the site once that moment passes, so the post goes live.
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content", "blog");
const now = Date.now();
let next = Infinity;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".md")) continue;
  const at = matter(fs.readFileSync(path.join(dir, f), "utf8")).data.publish_at;
  const t = at ? new Date(at).getTime() : NaN;
  if (t > now && t < next) next = t;
}
if (next !== Infinity) console.log(Math.floor(next / 1000));
