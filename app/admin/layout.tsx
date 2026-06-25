import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#F5F6F8]">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  );
}