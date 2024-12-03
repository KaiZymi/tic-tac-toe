import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import React from "react";

export function GameLayout({
  status,
  actions,
  field,
  players,
}: {
  players?: React.ReactNode;
  status?: React.ReactNode;
  field?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Крестики нолики 3x3</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {players}
          {status}
          <div className="flex items-center justify-center">{field}</div>
        </CardContent>
        <CardFooter>{actions}</CardFooter>
      </Card>
    </div>
  );
}
