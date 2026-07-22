import { listMedia } from "../../../../lib/cms";
import MediaUploader from "../../../../components/admin/MediaUploader";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const items = await listMedia();
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Media</h1>
      <p className="mt-1 text-[14.5px] text-ink-soft">
        Images aur videos yahan upload karein, phir kisi bhi section me URL paste kar dein.
      </p>
      <MediaUploader initialItems={items} />
    </div>
  );
}
