"use client";

import Image from "next/image";
import Logo from "../../../../public/logo.png";
import EditProfileForm from "@/components/Form/EditProfileForm";

export default function EditProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf8] py-12">
      <div className="bg-white p-12 rounded-lg flex flex-col shadow-xs border border-[#e5ddd0] max-w-md w-full">
        <div className="mb-6">
          <Image
            src={Logo}
            alt="Trendy Kotha Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
        <div className="text-center flex flex-col gap-2 mb-8">
          <h1 className="text-5xl font-serif text-[#4d3b2a] font-bold">
            Edit Profile
          </h1>
          <p className="text-sm font-normal font-inter text-[#5b4a3a]">
            Please update your details to edit your profile.
          </p>
        </div>
        <EditProfileForm />
      </div>
    </div>
  );
}
