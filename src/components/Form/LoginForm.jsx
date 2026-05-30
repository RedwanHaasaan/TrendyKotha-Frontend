"use client";
import { loginUser } from "@/services/authServices";
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
const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const onSubmit = async(data)=>{
        try{
            const result = await loginUser(data);
            if(result.success){
                toast.success("Login successful! Welcome back.");
            }
            router.push("/");
        }catch(error){
          console.log(error)
            toast.error(error|| "Failed to login");
        }
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
