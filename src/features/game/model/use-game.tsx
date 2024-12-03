import { GameDomain } from "@/entities/game";
import { useEventsSource } from "@/shared/lib/sse/client";
import { GameId } from "@/kernel/ids";
import { routes } from "@/kernel/routes";

export function useGame(gameId: GameId) {
  const { isPending, dataSteam } = useEventsSource<GameDomain.GameEntity>(
    routes.gameStream(gameId),
  );

  return {
    game: dataSteam,
    isPending,
  };
}
