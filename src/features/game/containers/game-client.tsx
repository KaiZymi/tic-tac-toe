"use client";

import { GameDomain } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { GameLayout } from "@/features/game/ui/layout";
import { GamePlayers } from "@/features/game/ui/players";
import { GameField } from "@/features/game/ui/field";
import { GameStatus } from "@/features/game/ui/status";
import { useGame } from "@/features/game/model/use-game";

//опенсоурсинг на клиенте
export function GameClient({
  defaultGame,
}: {
  defaultGame: GameDomain.GameEntity;
}) {
  const { game = defaultGame } = useGame(defaultGame.id);

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}
