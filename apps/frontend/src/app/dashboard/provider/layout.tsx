import { ProviderSidebar } from "@/components/dashboard/ProviderSidebar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRole="PROVIDER">
      <div className="min-h-screen flex text-foreground bg-background">
        <ProviderSidebar />
        <main className="flex-1 ml-64 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 gradient-bg -z-10 opacity-50" />
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
