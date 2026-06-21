import { requireAdmin } from "@/lib/session";
import AppSidebar from "@/components/admin/AppSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

// Auth-gated routes must be request-time, not build-time
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Server-side auth check. middleware.ts already guards at the Edge,
  // but requireAdmin gives us the user object for the sidebar.
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AppSidebar user={{ name: user.name, email: user.email }} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader user={{ name: user.name }} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
