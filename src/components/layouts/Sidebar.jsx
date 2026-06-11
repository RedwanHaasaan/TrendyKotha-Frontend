"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  User,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const { logout, isLoggingOut } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      href: "/dashboard",
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
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-linear-to-b from-[#f8f3eb] to-[#f0e4d4] border-r border-[#e5ddd0] min-h-screen transition-all duration-300 flex flex-col fixed left-0 top-0 pt-20 md:pt-0`}
    >
      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={`${item.href}-${item.name}`} href={item.href}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#5b4a3a] hover:bg-[#e5ddd0] transition-colors cursor-pointer group">
                <Icon size={20} className="shrink-0 group-hover:text-[#a16a2f]" />
                {!isCollapsed && (
                  <span className="text-sm font-medium group-hover:text-[#a16a2f]">
                    {item.name}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-[#e5ddd0]">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#5b4a3a] hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          <LogOut size={20} className="shrink-0 hover:text-red-600" />
          {!isCollapsed && (
            <span className="text-sm font-medium">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
