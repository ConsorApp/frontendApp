import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { RequireAuth } from "@/components/auth/RequiredAuth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-slate-100">{children}</main>
        </div>
      </div>
    </RequireAuth>
  );
}
