"use client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useForm } from "react-hook-form";
const RegisterForm = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data)=>{
        console.log(data);
    }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex w-xs flex-col gap-4 font-inter">
      <TextField
        isRequired
        name="fullName"
        type="text"
        validate={(value) => {
          if (value.trim() === "") {
            return "Full name is required";
          }
          return null;
        }}
      >
        <Label className="uppercase">Full Name</Label>
        <Input placeholder="Redwan Hasan" {...register("fullName")} className="rounded-sm custom-input"/>
        <FieldError />
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
        <Input placeholder="redwan@example.com" {...register("email")} className="rounded-sm custom-input"/>
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 6 characters";
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
        <Input placeholder="Enter your password" {...register("password")} className="rounded-sm custom-input"/>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit" className="w-full bg-primary text-white rounded-sm">
          Register
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
