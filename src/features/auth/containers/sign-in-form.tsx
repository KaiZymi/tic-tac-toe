"use client";

import React, { useState } from "react";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { AuthFields } from "@/features/auth/ui/auth-fields";
import { AuthFormLayout } from "@/features/auth/ui/auth-form-layout";
import { right } from "@/shared/lib/either";
import { AuthFormLink } from "@/features/auth/ui/auth-form-link";
import { ErrorMessage } from "@/features/auth/ui/auth-form-error";
import { useActionState } from "@/shared/lib/react";
import { signInAction, SignInFormState } from "@/features/auth/actions/sign-in";
import { routes } from "@/kernel/routes";

export function SignInForm() {
  const [formState, action, isPending] = useActionState(
    signInAction,
    {} as SignInFormState,
  );

  return (
    <AuthFormLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account "
      action={action}
      actions={<SubmitButton isPending={isPending}> Sign in </SubmitButton>}
      error={<ErrorMessage error={formState.errors?._errors} />}
      fields={<AuthFields {...formState} />}
      link={
        <AuthFormLink
          text="Don't have an account?"
          linkText="Sign Up"
          url={routes.signUp()}
        />
      }
    />
  );
}
