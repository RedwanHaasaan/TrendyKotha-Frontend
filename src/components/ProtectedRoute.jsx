// components/ProtectedRoute.jsx

"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const hasShownToast = useRef(false);
  const { loading, user, isLoggingOut } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // If we're in the middle of an intentional logout, suppress
      // the "must be logged in" toast because logout will show its own.
      if (isLoggingOut) return;

      if (!hasShownToast.current) {
        toast.error("You must be logged in to access this page.");

        hasShownToast.current = true;
      }

      router.replace("/login");
      return;
    }
    if (!loading && isAuthenticated && !user?.isProfileCompleted) {
      if (!hasShownToast.current) {
        toast.error("Please complete your profile to continue.");

        hasShownToast.current = true;
      }

      router.replace("/dashboard/create-profile");
      return;
    }
  }, [loading, isAuthenticated, user, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">Loading...</div>
    );
  }
  return children;
}
