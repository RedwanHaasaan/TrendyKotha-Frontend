"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/layouts/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Onboarding page (create-profile) and edit-profile page do not show the standard sidebar layout
  const isFullPage = pathname === "/dashboard/create-profile" || pathname === "/dashboard/edit-profile";

  if (isFullPage) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#fdfbf8]">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Backdrop for mobile */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Main Content Wrapper */}
        <div
          className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
            isCollapsed ? "md:pl-20" : "md:pl-64"
          }`}
        >
          {/* Mobile top bar for toggling sidebar */}
          <header className="md:hidden flex items-center justify-between px-6 py-4 bg-linear-to-r from-[#f8f3eb] to-[#f0e4d4] border-b border-[#e5ddd0] sticky top-0 z-30 h-20 shrink-0">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="text-[#5b4a3a] hover:text-[#9c682f] p-2 rounded-lg hover:bg-[#e5ddd0]/50 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <span className="font-garamond text-xl font-bold text-[#4d3b2a]">
              Trendy Kotha
            </span>
            <div className="w-10"></div> {/* Spacer to center title */}
          </header>

          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}