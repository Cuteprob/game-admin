import { Header } from "@/components/admin/Header"
import { Sidebar } from "@/components/admin/Sidebar"
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 relative">
          {children}
        </main>
      </div>
    </div>
  )
} 