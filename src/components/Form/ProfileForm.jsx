"use client";
import { createProfile } from "@/services/profile";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

const ProfileForm = () => {
  const { register, handleSubmit } = useForm();
  const {loadUser} = useAuth();
  const router = useRouter();
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
      const result = await createProfile(formData);
      if (result.success) {
        await loadUser();
        router.replace("/dashboard");
        toast.success(`Profile Create Successfully! Welcome to TrendyKotha`)
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-xs flex-col gap-4 font-inter"
    >
      <TextField isRequired name="fullName" type="text">
        <Label className="uppercase">Full Name</Label>
        <Input
          placeholder="Enter your full name"
          className="rounded-sm custom-input"
          {...register("fullName")}
        />
        <FieldError />
      </TextField>
      <div className="flex flex-col gap-2">
        <Label htmlFor="textarea-rows-3" className="uppercase">
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
        <Label className="uppercase">Profile Picture</Label>
        <Input
          type="file"
          accept="image/*"
          className="rounded-sm custom-input"
          {...register("profilepicture")}
        />
      </div>
      <div>
        <h2 className="text-lg mb-2 text-gray-700 uppercase">Social Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <TextField name="website" type="url">
            <Label className="uppercase">Website</Label>
            <Input
              placeholder="https://yourwebsite.com"
              className="rounded-sm custom-input"
              {...register("website")}
            />
            <FieldError />
          </TextField>

          <TextField name="linkedin" type="url">
            <Label className="uppercase">LinkedIn</Label>
            <Input
              placeholder="https://linkedin.com/in/username"
              className="rounded-sm custom-input"
              {...register("linkedin")}
            />
            <FieldError />
          </TextField>

          <TextField name="github" type="url">
            <Label className="uppercase">GitHub</Label>
            <Input
              placeholder="https://github.com/username"
              className="rounded-sm custom-input"
              {...register("github")}
            />
            <FieldError />
          </TextField>

          <TextField name="twitter" type="url">
            <Label className="uppercase">Twitter / X</Label>
            <Input
              placeholder="https://x.com/username"
              className="rounded-sm custom-input"
              {...register("twitter")}
            />
            <FieldError />
          </TextField>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          className="w-full bg-primary text-white rounded-sm"
        >
          Create Profile
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
