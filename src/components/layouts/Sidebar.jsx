"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  User,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Logo from "../../../public/logo.png";
import Image from "next/image"; 

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const pathname = usePathname();
  const { logout, isLoggingOut } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "Profile",
      icon: User,
      href: "/dashboard/profile",
    },
    {
      name: "My Blogs",
      icon: FileText,
      href: "/dashboard/blogs",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-50 md:z-30 h-screen transition-all duration-300 flex flex-col bg-linear-to-b from-[#f8f3eb] to-[#f0e4d4] border-r border-[#e5ddd0]
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${isCollapsed ? "md:w-20" : "md:w-64"}
        w-64
      `}
    >
      {/* Desktop Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex absolute -right-3 top-8 bg-white border border-[#e5ddd0] text-[#5b4a3a] hover:text-[#9c682f] w-6 h-6 rounded-full items-center justify-center shadow-xs hover:shadow-sm transition-all z-50 cursor-pointer"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Sidebar Header (Brand & Close Button for Mobile) */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5ddd0] h-20 shrink-0">
        <div className="flex items-center gap-2">
          {!isCollapsed ? (
            <span className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-[#4d3b2a]">
              Trendy Kotha
            </span>
          ) : (
            <Image src={Logo} alt="Trendy Kotha Logo" width={50} height={50} />
          )}
        </div>
        {/* Mobile close button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden text-[#5b4a3a] hover:text-[#9c682f] p-1 rounded-lg hover:bg-[#e5ddd0] transition-colors"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={`${item.href}-${item.name}`} href={item.href}>
              <div
                className={`flex items-center ${
                  isCollapsed ? "justify-center px-2" : "gap-3 px-4"
                } py-3 rounded-lg transition-colors cursor-pointer group ${
                  isActive
                    ? "bg-[#e5ddd0] text-[#9c682f] font-semibold"
                    : "text-[#5b4a3a] hover:bg-[#e5ddd0]/60 hover:text-[#9c682f]"
                }`}
                title={isCollapsed ? item.name : undefined}
                onClick={() => setIsMobileOpen(false)} // Close mobile drawer on item click
              >
                <Icon
                  size={20}
                  className={`shrink-0 transition-colors ${
                    isActive ? "text-[#9c682f]" : "group-hover:text-[#9c682f]"
                  }`}
                />
                {!isCollapsed && (
                  <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.name}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-[#e5ddd0] shrink-0">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full flex items-center ${
            isCollapsed ? "justify-center px-2" : "gap-3 px-4"
          } py-3 rounded-lg text-[#5b4a3a] hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && (
            <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
