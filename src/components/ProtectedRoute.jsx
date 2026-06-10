// components/ProtectedRoute.jsx

"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const hasShownToast = useRef(false);
  const wasAuthenticatedRef = useRef(false);
  const { loading, user, isLoggingOut } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      if (isLoggingOut || wasAuthenticatedRef.current) {
        wasAuthenticatedRef.current = false; // Reset for next time
        return;
      }

      if (!hasShownToast.current) {
        toast.error("You must be logged in to access this page.");
        hasShownToast.current = true;
      }

      router.replace("/login");
      return;
    }
    
    // Track if user is authenticated
    if (isAuthenticated) {
      wasAuthenticatedRef.current = true;
      hasShownToast.current = false; // Reset toast flag when user logs back in
    }
    
    if (!loading && isAuthenticated && !user?.isProfileCompleted) {
      if (!hasShownToast.current) {
        toast.error("Please complete your profile to continue.");

        hasShownToast.current = true;
      }

      router.replace("/dashboard/create-profile");
      return;
    }
  }, [loading, isAuthenticated, user, router, isLoggingOut]);

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
