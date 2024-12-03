import { prisma } from "@/shared/lib/db";
import { GamesList } from "@/features/games-list/containers/game-list";

export default async function Home() {


  return (
    <div className=" flex flex-col gap-8 container mx-auto pt-[100px] ">
      <h1 className="text-2xl font-bold">Игры</h1>
      <GamesList />
    </div>
  );
}
