import { GameId } from "@/kernel/ids";
import { GameClient } from "@/features/game/containers/game-client";
import { getCurrentUser } from "@/entities/user/server";
import { getGameById, startGame } from "@/entities/game/server";
import { gameEvents } from "../services/game-events";
import { redirect } from "next/navigation";

//опенсоурсинг на клиенте

export async function Game({ gameId }: { gameId: GameId }) {
  const user = await getCurrentUser();

  let game = await getGameById(gameId);

  console.log(game);

  if (!game) {
    redirect("/");
  }

  if (user) {
    const startGameResult = await startGame(gameId, user);

    if (startGameResult.type === "right") {
      game = startGameResult.value;
      await gameEvents.emit(startGameResult.value);
    }
  }

  return <GameClient defaultGame={game} />;
}
