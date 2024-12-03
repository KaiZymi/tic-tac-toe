import {
  GameEntity,
  GameIdleEntity,
  GameOverEntity,
  PlayerEntity,
} from "@/entities/game/domain";
import { prisma } from "@/shared/lib/db";
import { Game, GamePlayer, Prisma, User } from "@prisma/client";
import { z } from "zod";
import { removePassword } from "@/shared/lib/password";
import { GameId } from "@/kernel/ids";

//Смысл репозиториев, это преобразовать сущности с бд в сущности, которые нужны для работы в проекте

const gameInclude = {
  winner: { include: { user: true } },
  players: { include: { user: true } },
};

async function gameList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    where,
    include: gameInclude,
  });

  return games.map(dbGameToGameEntity);
}

async function getGame(where?: Prisma.GameWhereInput) {
  const game = await prisma.game.findFirst({
    where,
    include: gameInclude,
  });

  if (game) {
    return dbGameToGameEntity(game);
  }
  return undefined;
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await prisma.game.create({
    data: {
      status: game.status,
      id: game.id,
      field: game.field,
      players: {
        create: {
          index: 0,
          userId: game.creator.id,
        },
      },
    },
    include: gameInclude,
  });

  return dbGameToGameEntity(createdGame);
}

async function startGame(gameId: GameId, player: PlayerEntity) {
  const game = await prisma.game.update({
    where: { id: gameId },
    data: {
      players: {
        create: {
          index: 1,
          userId: player.id,
        },
      },
      status: "inProgress",
    },
    include: gameInclude,
  });

  return dbGameToGameEntity(game);
}

//Парсинг полей
const fieldSchema = z.array(z.union([z.string(), z.null()]));

//Это хелпер
function dbGameToGameEntity(
  game: Game & {
    players: Array<GamePlayer & { user: User }>;
    winner?: (GamePlayer & { user: User }) | null;
  },
): GameEntity {
  const players = game.players
    .sort((a, b) => a.index - b.index)
    .map(dbPlayersToPlayer);

  switch (game.status) {
    case "idle": {
      const [creator] = players;
      if (!creator) {
        throw new Error("creator should be in game idle");
      }
      return {
        id: game.id,
        creator: creator,
        status: game.status,
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntity;
    }
    case "inProgress":
    case "gameOverDraw":
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      };

    case "gameOver": {
      if (!game.winner) {
        throw new Error("winner should be in game over");
      }
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: dbPlayersToPlayer(game.winner),
      } satisfies GameOverEntity;
    }
  }
}

export const dbPlayersToPlayer = (
  db: GamePlayer & { user: User },
): PlayerEntity => {
  return {
    id: db.user.id,
    login: db.user.login,
    rating: db.user.rating,
  };
};

export const gameRepository = { gameList, createGame, getGame, startGame };
