"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/hooks/useAuth";
import { getProfile } from "@/services/profile";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?._id) {
        try {
          const profileData = await getProfile(user._id);
          if (profileData.success) {
            setProfile(profileData.profile);
            console.log(profileData.profile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <>
      {/* Header */}
      <DashboardHeader
        title="Dashboard"
        description={`${profile?.fullName || profile?.fullname}! Welcome to your dashboard. Here you can manage your blogs and interact with your audience.`}
      />

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md border border-[#e5ddd0] p-6">
            <div className="text-[#5b4a3a] text-sm font-medium mb-1">
              Total Blogs
            </div>
            <div className="text-3xl font-bold text-[#9c682f] font-serif">{profile?.posts?.length || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-[#e5ddd0] p-6">
            <div className="text-[#5b4a3a] text-sm font-medium mb-1">
              Total Views
            </div>
            <div className="text-3xl font-bold text-[#9c682f] font-serif">{0}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-[#e5ddd0] p-6">
            <div className="text-[#5b4a3a] text-sm font-medium mb-1">
              Total Bookmarks
            </div>
            <div className="text-3xl font-bold text-[#9c682f] font-serif">{profile?.bookmarks?.length || 0}</div>
          </div>
        </div>
      </div>
    </>
  );
}
