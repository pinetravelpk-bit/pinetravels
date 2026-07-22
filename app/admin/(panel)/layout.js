import { redirect } from "next/navigation";
import { currentUser } from "../../../lib/auth";
import AdminNav from "../../../components/admin/AdminNav";

export const metadata = { title: "Admin — Pine Travel", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }) {
  const user = await currentUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#f5f6f4] text-ink">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AdminNav user={user} />
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-4xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
