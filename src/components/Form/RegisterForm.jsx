"use client";
import { registerUser } from "@/services/authServices";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);
      if (result.success) {
        toast.success("Registration successful! Please log in.");
      }
      router.push("/login");
    } catch (error) {
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message,
          });
        });
        return;
      }
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-xs flex-col gap-4 font-inter"
    >
      <TextField
        isRequired
        name="username"
        type="text"
        validate={(value) => {
          if (value.trim() === "") {
            return "User name is required";
          }
          return null;
        }}
      >
        <Label className="uppercase">User Name</Label>
        <Input
          placeholder="redwanHasan#2424"
          {...register("username")}
          className="rounded-sm custom-input"
        />
        <FieldError />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </TextField>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label className="uppercase">Email</Label>
        <Input
          placeholder="redwan@example.com"
          {...register("email")}
          className="rounded-sm custom-input"
        />
        <FieldError />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label className="uppercase">Password</Label>
        <Input
          placeholder="Enter your password"
          {...register("password")}
          className="rounded-sm custom-input"
        />
        <FieldError />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </TextField>
      <div className="flex gap-2">
        <Button
          type="submit"
          className="w-full bg-primary text-white rounded-sm"
        >
          Register
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
