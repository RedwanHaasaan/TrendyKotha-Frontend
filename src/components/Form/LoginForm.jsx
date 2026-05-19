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
const LoginForm = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data)=>{
        console.log(data);
    }
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
        <Button type="submit" className="w-full bg-primary text-white rounded-sm">
          Login
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
