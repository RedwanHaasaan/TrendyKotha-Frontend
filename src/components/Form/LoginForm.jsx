"use client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
const LoginForm = () => {
  return (
    <Form className="flex w-xs flex-col gap-4 font-inter">
      <TextField
        isRequired
        name="email"
        type="email"
      >
        <Label className="uppercase">Email</Label>
        <Input placeholder="redwan@example.com"  className="rounded-sm custom-input"/>
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="password"
        type="password"
      >
        <Label className="uppercase">Password</Label>
        <Input placeholder="Enter your password" className="rounded-sm custom-input"/>
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
