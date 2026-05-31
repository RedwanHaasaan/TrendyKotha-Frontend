"use client";

import Navbar from "@/components/layouts/Navbar";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
      <div>
        <Navbar/>
        <h1 className="text-3xl font-bold">
          Welcome <span className="text-primary">{user?.username}</span>
        </h1>
      </div>
  );
}