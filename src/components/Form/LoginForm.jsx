"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { loginUser } from "@/services/authServices";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
    const { loadUser } = useAuth();
    const { register, handleSubmit } = useForm();
    const [localLoading, setLocalLoading] = React.useState(false);
    const router = useRouter();

    const onSubmit = async (data) => {
      setLocalLoading(true);
      try {
        const result = await loginUser(data);
        if (result?.success) {
          // refresh current user from server
          await loadUser();
          // navigate based on profile completion
          if (result.user?.isProfileCompleted) {
            router.replace("/dashboard");
          } else {
            router.replace("/dashboard/create-profile");
          }
        }
      } catch (error) {
        // show toast only here (loginService doesn't toast)
        toast.error(error.message || error || "Login failed");
      } finally {
        setLocalLoading(false);
      }
    };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex w-xs flex-col gap-4 font-inter">
      <TextField
        isRequired
        name="email"
        type="email"
      >
        <Label className="uppercase">Email</Label>
        <Input placeholder="redwan@example.com" {...register("email")} className="rounded-sm custom-input"/>
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="password"
        type="password"
      >
        <Label className="uppercase">Password</Label>
        <Input placeholder="Enter your password" {...register("password")} className="rounded-sm custom-input"/>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit" className="w-full bg-primary text-white rounded-sm" disabled={localLoading}>
          {localLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
