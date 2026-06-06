// components/ProtectedRoute.jsx

"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const hasShownToast = useRef(false);
  const { loading, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
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
