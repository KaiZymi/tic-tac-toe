"use client";

import React from "react";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { AuthFields } from "@/features/auth/ui/auth-fields";
import { AuthFormLayout } from "@/features/auth/ui/auth-form-layout";
import { AuthFormLink } from "@/features/auth/ui/auth-form-link";
import { ErrorMessage } from "@/features/auth/ui/auth-form-error";
import { useActionState } from "@/shared/lib/react";
import { signUpAction } from "@/features/auth/actions/sign-up";
import { SignInFormState } from "@/features/auth/actions/sign-in";
import { routes } from "@/kernel/routes";

export function SignUpForm() {
  //Второй аргумент, дефолтное состояние нашей формы
  const [formState, action, isPending] = useActionState(
    signUpAction,
    {} as SignInFormState,
  );

  return (
    <AuthFormLayout
      title="Sign Up"
      description="Create a new account and start play"
      action={action}
      actions={<SubmitButton isPending={isPending}> Sign up </SubmitButton>}
      error={<ErrorMessage error={formState.errors?._errors} />}
      fields={<AuthFields {...formState} />}
      link={
        <AuthFormLink
          text="Already have an account?"
          linkText="Sign In"
          url={routes.signIn()}
        />
      }
    />
  );
}
