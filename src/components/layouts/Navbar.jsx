"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import { useAuth } from "@/hooks/useAuth";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading, authLoading, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e5ddd0] bg-[#f8f3eb]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center">
              <Image
                src={Logo}
                alt="Trendy Kotha Logo"
                width={100}
                height={100}
              />
            </div>

            <span className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-[#4d3b2a]">
              TrendyKotha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link
              href="/"
              className="text-sm lg:text-base text-[#5b4a3a] hover:text-[#a16a2f] transition"
            >
              Home
            </Link>

            <Link
              href="/blogs"
              className="text-sm lg:text-base text-[#5b4a3a] hover:text-[#a16a2f] transition"
            >
              Blogs
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
            ) : !user ? (
              <>
                <Link
                  href="/login"
                  className="text-sm lg:text-base font-medium text-[#5b4a3a] hover:text-[#a16a2f]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-[#9c682f] px-4 py-2 lg:px-5 lg:py-2.5 text-sm font-medium text-white transition hover:bg-[#865623]"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm lg:text-base font-medium text-[#5b4a3a] hover:text-[#a16a2f] border border-[#d3c4ae] px-4 py-2 rounded-full"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={authLoading}
                  className="rounded-full border border-[#d3c4ae] px-4 py-2 text-sm text-[#5b4a3a] hover:bg-[#f0e4d4] cursor-pointer lg:text-base font-medium"
                >
                  {authLoading ? "Logging out..." : "Logout"}
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#4d3b2a]"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 border-t border-[#e5ddd0]" : "max-h-0"
        }`}
      >
        <div className="bg-[#f8f3eb] px-4 py-5">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/blogs" onClick={() => setOpen(false)}>
              Blogs
            </Link>

            <div className="border-t border-[#e5ddd0] pt-4">
              {loading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
              ) : !user ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-[#9c682f] py-2 text-center text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-[#9c682f] py-2 text-center text-white"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-[#9c682f] py-2 text-center text-white"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    disabled={authLoading}
                    className="rounded-full bg-[#9c682f] py-2 text-center text-white"
                  >
                    {authLoading ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
