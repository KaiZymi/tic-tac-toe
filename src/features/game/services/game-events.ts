import { GameDomain } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { EventsChanel } from "@/shared/lib/events";

type GameEvent = {
  type: "game-changed";
  data: GameDomain.GameEntity;
};

type Listener = (game: GameEvent) => void;

// Решил сделать классом, вместо файлика с кучей экспортов функций в конце

class GameEventService {
  eventsChanel = new EventsChanel("game");

  addListener(gameId: GameId, listener: Listener) {
    return this.eventsChanel.consume(gameId, (data) => {
      listener(data as GameEvent);
    });

    // let listeners = this.listeners.get(gameId);
    // if (!listeners) {
    //   listeners = new Set([listener]);
    //   this.listeners.set(gameId, listeners);
    // }
    // listeners.add(listener);
    //
    // return () => {
    //   listeners?.delete(listener);
    // };
  }

  emit(game: GameDomain.GameEntity) {
    return this.eventsChanel.emit(game.id, {
      type: "game-changed",
      data: game,
    } satisfies GameEvent);

    // const listeners = this.listeners.get(game.id) ?? new Set();
    //
    // for (const listener of listeners) {
    //   listener({ type: "game-changed", data: game });
    // }
  }
}

export const gameEvents = new GameEventService();
