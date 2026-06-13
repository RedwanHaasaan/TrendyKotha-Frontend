"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getProfile, updateProfile } from "@/services/profile";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EditProfileForm = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, loadUser } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, control } = useForm({
    values: {
      fullName: profile?.fullname || "",
      bio: profile?.bio || "",
      website: profile?.links?.website || "",
      linkedin: profile?.links?.linkedin || "",
      github: profile?.links?.github || "",
      twitter: profile?.links?.twitter || "",
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?._id) {
        try {
          const profileData = await getProfile(user._id);
          if (profileData.success && profileData.profile) {
            setProfile(profileData.profile);
          }
        } catch (error) {
          console.error("Error fetching profile for edit:", error);
          toast.error("Failed to load profile details");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("bio", data.bio);
      formData.append("website", data.website || "");
      formData.append("linkedin", data.linkedin || "");
      formData.append("github", data.github || "");
      formData.append("twitter", data.twitter || "");
      if (data.profilepicture?.[0]) {
        formData.append("profilepicture", data.profilepicture[0]);
      }

      const result = await updateProfile(formData);
      if (result.success) {
        if (loadUser) {
          await loadUser();
        }
        router.replace("/dashboard/profile");
        toast.success("Profile Updated Successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 w-xs animate-pulse">
        <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
      </div>
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-xs flex-col gap-4 font-inter"
    >
      <Controller
        name="fullName"
        control={control}
        rules={{ required: "Full name is required" }}
        render={({ field }) => (
          <TextField isRequired name="fullName" type="text" value={field.value} onChange={field.onChange}>
            <Label className="uppercase text-xs font-semibold text-[#4d3b2a]/70">Full Name</Label>
            <Input
              placeholder="Enter your full name"
              className="rounded-sm custom-input"
              onBlur={field.onBlur}
              ref={field.ref}
            />
            <FieldError />
          </TextField>
        )}
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="textarea-rows-3" className="uppercase text-xs font-semibold text-[#4d3b2a]/70">
          Bio
        </Label>
        <TextArea
          aria-label="Bio"
          id="textarea-rows-3"
          placeholder="Tell us about yourself"
          rows={3}
          className="rounded-sm custom-input"
          {...register("bio")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="uppercase text-xs font-semibold text-[#4d3b2a]/70">Profile Picture</Label>
        <Input
          type="file"
          accept="image/*"
          className="rounded-sm custom-input"
          {...register("profilepicture")}
        />
      </div>

      <div>
        <h2 className="text-sm font-bold mb-3 text-gray-700 uppercase tracking-wider">Social Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <TextField name="website" type="url" value={field.value} onChange={field.onChange}>
                <Label className="uppercase text-xs font-semibold text-[#4d3b2a]/70">Website</Label>
                <Input
                  placeholder="https://yourwebsite.com"
                  className="rounded-sm custom-input"
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
                <FieldError />
              </TextField>
            )}
          />

          <Controller
            name="linkedin"
            control={control}
            render={({ field }) => (
              <TextField name="linkedin" type="url" value={field.value} onChange={field.onChange}>
                <Label className="uppercase text-xs font-semibold text-[#4d3b2a]/70">LinkedIn</Label>
                <Input
                  placeholder="https://linkedin.com/in/username"
                  className="rounded-sm custom-input"
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
                <FieldError />
              </TextField>
            )}
          />

          <Controller
            name="github"
            control={control}
            render={({ field }) => (
              <TextField name="github" type="url" value={field.value} onChange={field.onChange}>
                <Label className="uppercase text-xs font-semibold text-[#4d3b2a]/70">GitHub</Label>
                <Input
                  placeholder="https://github.com/username"
                  className="rounded-sm custom-input"
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
                <FieldError />
              </TextField>
            )}
          />

          <Controller
            name="twitter"
            control={control}
            render={({ field }) => (
              <TextField name="twitter" type="url" value={field.value} onChange={field.onChange}>
                <Label className="uppercase text-xs font-semibold text-[#4d3b2a]/70">Twitter / X</Label>
                <Input
                  placeholder="https://x.com/username"
                  className="rounded-sm custom-input"
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
                <FieldError />
              </TextField>
            )}
          />
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <Button
          type="submit"
          className="w-full bg-[#9c682f] hover:bg-[#865623] text-white rounded-lg py-2.5 font-medium transition cursor-pointer"
        >
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default EditProfileForm;
