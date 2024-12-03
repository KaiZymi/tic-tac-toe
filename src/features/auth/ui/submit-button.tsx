import { Icons } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/button";
import { useFormStatus } from "react-dom";
import React from "react";


export function SubmitButton({children, isPending}: {children: React.ReactNode, isPending: boolean}) {
  // const { pending } = useFormStatus()

  return (<Button disabled={isPending}>
    {isPending && (
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    )}
    {children}
  </Button>)
}