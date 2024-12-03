import { getIdleGames } from "@/entities/game/server";
import { Layout } from "@/features/games-list/ui/layout";
import { GameCard } from "@/features/games-list/ui/game-card";
import { CreateButton } from "@/features/games-list/containers/create-button";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { routes } from "@/kernel/routes";

export async function GamesList() {
  const games = await getIdleGames();

  return (
    <Layout actions={<CreateButton />}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          login={game.creator.login}
          rating={game.creator.rating}
          actions={
            <Link href={routes.game(game.id)}>
              <Button>Подключиться </Button>
            </Link>
          }
        />
      ))}
    </Layout>
  );
}
