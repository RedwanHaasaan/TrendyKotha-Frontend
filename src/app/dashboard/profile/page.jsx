"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Globe,
  Calendar,
  FileText,
  Bookmark,
  Edit3,
  Clock,
  ArrowRight,
  User,
  ShieldAlert
} from "lucide-react";
import { getProfile } from "@/services/profile";
import { LogoGithub, LogoLinkedin } from "@gravity-ui/icons";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?._id) {
        try {
          const profileData = await getProfile(user._id);
          if (profileData.success) {
            setProfile(profileData.profile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  // Active check if no profile exists
  const hasProfile = !!profile;

  return (
    <div className="min-h-screen bg-[#fdfbf8] pb-12">
      {/* Header */}
      <DashboardHeader
        title="Profile"
        description="Manage your profile information and settings"
      />

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-6 py-8 md:px-8">
        {!hasProfile ? (
          /* Empty State - No Profile Found */
          <div className="bg-white rounded-2xl border border-[#e5ddd0] p-12 text-center shadow-xs max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#f8f3eb] flex items-center justify-center text-[#9c682f] mb-6">
              <ShieldAlert size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[#4d3b2a] font-serif mb-3">
              Profile Not Created Yet
            </h2>
            <p className="text-[#5b4a3a] mb-8 max-w-md">
              Create your profile to display your full name, bio, social links, and custom profile picture on the platform.
            </p>
            <Link href="/dashboard/create-profile">
              <button className="flex items-center gap-2 bg-[#9c682f] hover:bg-[#865623] text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                Create Profile Now
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        ) : (
          /* Active Profile Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Left/Main Column: Profile Info Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e5ddd0] overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300">

              {/* Cover Banner */}
              <div className="h-40 bg-linear-to-r from-[#9c682f] via-[#a16a2f] to-[#7f4f1d] relative overflow-hidden">
                {/* Decorative overlay circles for premium look */}
                <div className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-[-50%] left-[10%] w-40 h-40 bg-white/5 rounded-full blur-xl" />
              </div>

              {/* Profile Main Body */}
              <div className="relative px-6 pb-8 md:px-8">

                {/* Profile Picture */}
                <div className="flex flex-col md:flex-row gap-6 -mt-16 mb-6 items-start md:items-end">
                  <div className="relative group shrink-0">
                    {profile.profilepicture ? (
                      <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white transition-transform duration-300 group-hover:scale-[1.02]">
                        <Image
                          src={profile.profilepicture}
                          alt={profile.fullname || "User Profile"}
                          width={144}
                          height={144}
                          className="object-cover"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-[#f0e4d4] border-4 border-white shadow-xl flex items-center justify-center text-5xl font-serif text-[#9c682f] font-bold">
                        {profile.fullname?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Name, Username, and Badges */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-[#4d3b2a] font-serif truncate">
                        {profile.fullname}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#f8f3eb] text-[#9c682f] text-xs font-semibold border border-[#e5ddd0]/60">
                        Author
                      </span>
                    </div>
                    <p className="text-[#5b4a3a]/80 font-mono text-sm">
                      @{profile.user?.username || user?.username}
                    </p>
                  </div>
                </div>

                {/* About/Bio Section */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#4d3b2a]/60 mb-2">
                    About
                  </h3>
                  <p className="text-[#5b4a3a] leading-relaxed text-base">
                    {profile.bio || "No biography provided yet. Edit your profile to tell your readers about yourself."}
                  </p>
                </div>

                {/* Contact & Social Section */}
                <div className="border-t border-[#e5ddd0]/70 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Contact Info */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-[#4d3b2a]/60 mb-3">
                        Contact
                      </h4>
                      <div className="flex items-center gap-3 text-[#5b4a3a] bg-[#fdfbf8] p-3 rounded-xl border border-[#e5ddd0]/50 hover:bg-white hover:border-[#9c682f]/30 transition-all duration-300">
                        <div className="w-8 h-8 rounded-lg bg-[#f8f3eb] flex items-center justify-center text-[#9c682f]">
                          <Mail size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-[#5b4a3a]/60 font-medium">Email Address</p>
                          <p className="text-sm text-[#4d3b2a] font-medium truncate">
                            {profile.user?.email || user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Social Media Links */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-[#4d3b2a]/60 mb-3">
                        Social & Websites
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.links?.website ? (
                          <a
                            href={profile.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f8f3eb] text-[#9c682f] border border-[#e5ddd0]/60 hover:bg-[#9c682f] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                            title="Website"
                          >
                            <Globe size={18} />
                          </a>
                        ) : null}

                        {profile.links?.github ? (
                          <a
                            href={profile.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f8f3eb] text-[#9c682f] border border-[#e5ddd0]/60 hover:bg-[#9c682f] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                            title="GitHub"
                          >
                            <LogoGithub size={18} />
                          </a>
                        ) : null}

                        {profile.links?.linkedin ? (
                          <a
                            href={profile.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f8f3eb] text-[#9c682f] border border-[#e5ddd0]/60 hover:bg-[#9c682f] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                            title="LinkedIn"
                          >
                            <LogoLinkedin size={18} />
                          </a>
                        ) : null}

                        {profile.links?.twitter ? (
                          <a
                            href={profile.links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f8f3eb] text-[#9c682f] border border-[#e5ddd0]/60 hover:bg-[#9c682f] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                            title="Twitter"
                          >
                            <Twitter size={18} />
                          </a>
                        ) : null}

                        {!profile.links?.website && !profile.links?.github && !profile.links?.linkedin && !profile.links?.twitter && (
                          <p className="text-sm text-[#5b4a3a]/60 italic py-1">No links added yet.</p>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Stats & Meta Cards */}
            <div className="space-y-6">

              {/* Activity Stats Card */}
              <div className="bg-white rounded-2xl border border-[#e5ddd0] p-6 shadow-xs hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-bold text-[#4d3b2a] font-serif mb-4 pb-2 border-b border-[#e5ddd0]/60 flex items-center gap-2">
                  <User size={18} className="text-[#9c682f]" />
                  Activity Statistics
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* Total Posts */}
                  <div className="bg-[#fdfbf8] p-4 rounded-xl border border-[#e5ddd0]/50 flex flex-col items-center justify-center text-center">
                    <FileText size={20} className="text-[#9c682f] mb-1.5" />
                    <span className="text-2xl font-bold text-[#4d3b2a] font-serif">
                      {profile.posts?.length || 0}
                    </span>
                    <span className="text-xs text-[#5b4a3a]/70 font-medium mt-0.5">Blogs Published</span>
                  </div>

                  {/* Bookmarks */}
                  <div className="bg-[#fdfbf8] p-4 rounded-xl border border-[#e5ddd0]/50 flex flex-col items-center justify-center text-center">
                    <Bookmark size={20} className="text-[#9c682f] mb-1.5" />
                    <span className="text-2xl font-bold text-[#4d3b2a] font-serif">
                      {profile.bookmarks?.length || 0}
                    </span>
                    <span className="text-xs text-[#5b4a3a]/70 font-medium mt-0.5">Saved Bookmarks</span>
                  </div>
                </div>
              </div>

              {/* Account Meta Card */}
              <div className="bg-white rounded-2xl border border-[#e5ddd0] p-6 shadow-xs hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-bold text-[#4d3b2a] font-serif mb-4 pb-2 border-b border-[#e5ddd0]/60 flex items-center gap-2">
                  <Clock size={18} className="text-[#9c682f]" />
                  Account Details
                </h3>

                <div className="space-y-4">
                  {/* Joined Date */}
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-[#9c682f] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#5b4a3a]/60 font-medium">Date Joined</p>
                      <p className="text-sm text-[#4d3b2a] font-medium mt-0.5">
                        {formatDate(profile.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-[#9c682f] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#5b4a3a]/60 font-medium">Last Profile Update</p>
                      <p className="text-sm text-[#4d3b2a] font-medium mt-0.5">
                        {formatDate(profile.updatedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Edit Profile Button */}
                  <div className="pt-4 border-t border-[#e5ddd0]/60">
                    <Link href="/dashboard/edit-profile" className="block w-full">
                      <button className="w-full flex items-center justify-center gap-2 bg-[#9c682f] hover:bg-[#865623] text-white px-4 py-2.5 rounded-xl font-medium shadow-xs hover:shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm">
                        <Edit3 size={15} />
                        Edit Profile Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

// Loading Skeleton Component
function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#fdfbf8] animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-linear-to-r from-[#f8f3eb] to-[#f0e4d4] border-b border-[#e5ddd0] px-6 py-8 md:px-8">
        <div className="max-w-6xl mx-auto h-16 flex flex-col justify-center">
          <div className="h-8 bg-[#e5ddd0] rounded-md w-48 mb-2"></div>
          <div className="h-4 bg-[#e5ddd0] rounded-md w-80"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-8 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e5ddd0] overflow-hidden shadow-xs">
          <div className="h-40 bg-[#e5ddd0]/60"></div>
          <div className="px-6 pb-8 md:px-8 relative">
            <div className="w-32 h-32 rounded-2xl bg-[#e5ddd0] border-4 border-white -mt-16 mb-6"></div>
            <div className="h-7 bg-[#e5ddd0] rounded-md w-64 mb-3"></div>
            <div className="h-4 bg-[#e5ddd0] rounded-md w-36 mb-6"></div>
            <div className="h-4 bg-[#e5ddd0]/70 rounded-md w-full mb-2.5"></div>
            <div className="h-4 bg-[#e5ddd0]/70 rounded-md w-5/6"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#e5ddd0] p-6 shadow-xs">
            <div className="h-5 bg-[#e5ddd0] rounded-md w-32 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-[#e5ddd0]/50 rounded-xl"></div>
              <div className="h-20 bg-[#e5ddd0]/50 rounded-xl"></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#e5ddd0] p-6 shadow-xs">
            <div className="h-5 bg-[#e5ddd0] rounded-md w-32 mb-4"></div>
            <div className="space-y-3">
              <div className="h-8 bg-[#e5ddd0]/50 rounded-lg"></div>
              <div className="h-8 bg-[#e5ddd0]/50 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}