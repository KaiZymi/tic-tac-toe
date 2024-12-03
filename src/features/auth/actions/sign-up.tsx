"use server";
import { left, mapLeft } from "@/shared/lib/either";
import { z } from "zod";
import { createUser, sessionService } from "@/entities/user/server";
import { redirect } from "next/navigation";
import { SignInFormState } from "@/features/auth/actions/sign-in";


const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3)
});

export async function signUpAction(state: SignInFormState, formData: FormData): Promise<SignInFormState> {

  const data = Object.fromEntries(formData.entries());

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    const formatedErrors = result.error.format();
    return {
      formData,
      errors: {
        login: formatedErrors.login?._errors.join(", "),
        password: formatedErrors.password?._errors.join(", "),
        _errors: formatedErrors._errors.join(", ")
      }
    };
  }

  const createUserResult = await createUser(result.data);

  if (createUserResult.type === "right") {
    await sessionService.addSession(await createUserResult.value);
    redirect("/");
  }

  const errors = {
    "user-login-exists": "Пользователь с таким login существует"
  }[createUserResult.error];

  return {
    formData,
    errors: {
      _errors: errors
    }
  };

  // return mapLeft(createUserResult, (error) => {
  //   return {
  //     "user-login-exists" : "Пользователь с таким login существует"
  //   }[error]
  // })
}