import { ClientSidebar } from "@/components/dashboard/ClientSidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-950">
      <ClientSidebar />
      <main className="flex-1 ml-64 min-w-0 bg-slate-950">
        <div className="pro-container py-10">
          {children}
        </div>
      </main>

    </div>
  );
}

