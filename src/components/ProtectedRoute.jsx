// components/ProtectedRoute.jsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";


export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const { loading, isAuthenticated ,user} = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
    if (!user?.isProfileCompleted) {
      router.replace(
        "/dashboard/create-profile"
      );
      
    }
  }, [loading, isAuthenticated, user,router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}