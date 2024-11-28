import { gameRepository } from "@/entities/game/repositories/game";
import { GameIdleEntity } from "@/entities/game/domain";


export async function getIdleGames():Promise<GameIdleEntity[]>{
  const games = await gameRepository.gameList({
    status: "idle",
  })
  // games.filter(game => game.status === 'idle')
  return games as GameIdleEntity[];

}