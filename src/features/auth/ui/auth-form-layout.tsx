import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { SignUpForm } from "@/features/auth/containers/sign-up-form";
import Link from "next/link";
import React from "react";
import { AuthFormLink } from "@/features/auth/ui/auth-form-link";


export function AuthFormLayout({ title, description, fields, actions, link, action, error }: {
  title: string;
  description: string
  fields: React.ReactNode
  actions: React.ReactNode
  link: React.ReactNode
  error: React.ReactNode
  action: (form:FormData) => void
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className=" text-2xl font-bold text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="grid gap-4">
            {fields}
            {actions}
          </div>
          {error}
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {link}
      </CardFooter>
    </Card>
  );
}