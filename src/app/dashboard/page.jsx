"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/layouts/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import { getProfile } from "@/services/profile";

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile,setProfile]=useState(null);
  useEffect(() => {
    const profile = async () => {
      if (user?._id) {
        try {
          const profileData = await getProfile(user._id);
          if(profileData.success){
            setProfile(profileData.profile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    profile();
  }, [user]);
  console.log(profile)
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 bg-[#fdfbf8] min-h-screen">
          {/* Header */}
          <div className="bg-linear-to-r from-[#f8f3eb] to-[#f0e4d4] border-b border-[#e5ddd0] p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#4d3b2a]">
              Dashboard
            </h1>
            <p className="text-[#5b4a3a] mt-2">
              Welcome back, {profile?.fullname}!
            </p>
          </div>  

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md border border-[#e5ddd0] overflow-hidden">
              {/* Cover Section */}
              <div className="h-32 bg-linear-to-r from-[#9c682f] to-[#a16a2f]"></div>

              {/* Profile Content */}
              <div className="relative px-6 md:px-8 pb-8">
                {/* Profile Picture */}
                <div className="flex flex-col md:flex-row gap-6 -mt-16 mb-8">
                  <div className="shrink-0">
                    {profile?.profilepicture ? (
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          src={profile?.profilepicture}
                          alt={profile?.fullname || "User"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg bg-[#e5ddd0] border-4 border-white shadow-lg flex items-center justify-center">
                        <span className="text-4xl text-[#9c682f]">
                          {user?.username?.[0]?.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 flex flex-col justify-end md:justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#4d3b2a]">
                      {user?.profile?.fullName || user?.username}
                    </h2>
                    <p className="text-[#5b4a3a] text-sm md:text-base mt-1">
                      @{user?.username}
                    </p>
                    {user?.profile?.bio && (
                      <p className="text-[#5b4a3a] mt-3 max-w-2xl">
                        {user?.profile?.bio}
                      </p>
                    )}
                  </div>

                  {/* Edit Profile Button */}
                  <div className="flex flex-col gap-2 md:ml-auto">
                    <Link href="/dashboard/create-profile">
                      <button className="bg-[#9c682f] hover:bg-[#865623] text-white px-6 py-2 rounded-lg font-medium transition">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Contact & Social */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-[#e5ddd0]">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#4d3b2a] mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[#5b4a3a]">
                        <Mail size={18} className="text-[#9c682f]" />
                        <span>{user?.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#4d3b2a] mb-4">
                      Social Links
                    </h3>
                    <div className="space-y-2 flex flex-col">
                      {user?.profile?.website && (
                        <a
                          href={user?.profile?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#9c682f] hover:text-[#a16a2f] transition"
                        >
                          <ExternalLink size={16} />
                          <span className="truncate">Website</span>
                        </a>
                      )}
                      {user?.profile?.linkedin && (
                        <a
                          href={user?.profile?.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#9c682f] hover:text-[#a16a2f] transition"
                        >
                          <ExternalLink size={16} />
                          <span className="truncate">LinkedIn</span>
                        </a>
                      )}
                      {user?.profile?.github && (
                        <a
                          href={user?.profile?.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#9c682f] hover:text-[#a16a2f] transition"
                        >
                          <ExternalLink size={16} />
                          <span className="truncate">GitHub</span>
                        </a>
                      )}
                      {user?.profile?.twitter && (
                        <a
                          href={user?.profile?.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#9c682f] hover:text-[#a16a2f] transition"
                        >
                          <ExternalLink size={16} />
                          <span className="truncate">Twitter</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section (Optional) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg shadow-md border border-[#e5ddd0] p-6">
                <div className="text-[#5b4a3a] text-sm font-medium mb-1">
                  Total Blogs
                </div>
                <div className="text-3xl font-bold text-[#9c682f]">0</div>
              </div>
              <div className="bg-white rounded-lg shadow-md border border-[#e5ddd0] p-6">
                <div className="text-[#5b4a3a] text-sm font-medium mb-1">
                  Total Views
                </div>
                <div className="text-3xl font-bold text-[#9c682f]">0</div>
              </div>
              <div className="bg-white rounded-lg shadow-md border border-[#e5ddd0] p-6">
                <div className="text-[#5b4a3a] text-sm font-medium mb-1">
                  Total Followers
                </div>
                <div className="text-3xl font-bold text-[#9c682f]">0</div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}
