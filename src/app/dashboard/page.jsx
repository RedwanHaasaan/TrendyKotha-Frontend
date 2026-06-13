"use client";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      {/* Header */}
      <div className="bg-linear-to-r from-[#f8f3eb] to-[#f0e4d4] border-b border-[#e5ddd0] p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4d3b2a] font-serif">
          Dashboard
        </h1>
        <p className="text-[#5b4a3a] mt-2">
          Welcome back, {user?.profile?.fullName || user?.username}!
        </p>
      </div>  

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md border border-[#e5ddd0] p-6">
            <div className="text-[#5b4a3a] text-sm font-medium mb-1">
              Total Blogs
            </div>
            <div className="text-3xl font-bold text-[#9c682f] font-serif">0</div>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-[#e5ddd0] p-6">
            <div className="text-[#5b4a3a] text-sm font-medium mb-1">
              Total Views
            </div>
            <div className="text-3xl font-bold text-[#9c682f] font-serif">0</div>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-[#e5ddd0] p-6">
            <div className="text-[#5b4a3a] text-sm font-medium mb-1">
              Total Followers
            </div>
            <div className="text-3xl font-bold text-[#9c682f] font-serif">0</div>
          </div>
        </div>
      </div>
    </>
  );
}
