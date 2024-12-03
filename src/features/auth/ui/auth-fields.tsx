import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { useId } from "react";


export function AuthFields({errors, formData} : {
  formData?: FormData
  errors?:{
    login?: string,
    password?: string,
  }
}) {

  const loginId = useId();
  const passwordId = useId();

  return (<>
    <div className="grid gap-1">
      <Label htmlFor={loginId}>Login</Label>
      <Input
        id={loginId}
        name="login"
        placeholder="Enter your login"
        type="login"
        autoCapitalize="none"
        autoComplete="login"
        autoCorrect="off"
        defaultValue={formData?.get("login")?.toString()}
        required
      />
      {errors?.login && <div>{errors.login}</div>}
    </div>
    <div className="grid gap-1">
      <Label htmlFor={passwordId}>Password</Label>
      <Input
        id={passwordId}
        name="password"
        placeholder="password"
        type="password"
        autoComplete="new-password"
        defaultValue={formData?.get("password")?.toString()}
        required
      />
      {errors?.password && <div>{errors.password}</div>}
    </div>
  </>);
}