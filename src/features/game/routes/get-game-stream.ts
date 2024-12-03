import { NextRequest, NextResponse } from "next/server";
import { sseStream } from "@/shared/lib/sse/server";
import { getGameById } from "@/entities/game/server";
import { GameId } from "@/kernel/ids";
import { gameEvents } from "@/features/game/services/game-events";

//опенсоурсинг на сервере
export async function getGameStream(
  req: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) {
  const { id } = await params;

  const game = await getGameById(id);

  if (!game) {
    return new Response(`Game not found`, {
      status: 404,
    });
  }

  const { addCloseListener, closeStream, writeStream, response } =
    sseStream(req);

  writeStream(game);

  const unwatch = await gameEvents.addListener(game.id, (event) => {
    writeStream(event.data);
  });

  addCloseListener(() => {
    unwatch();
  });

  return response;
}
