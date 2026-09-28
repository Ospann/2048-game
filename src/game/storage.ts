import { stripTransient } from "./board";
import { createInitialState } from "./reducer";
import type { GameState, Rng, Snapshot, Status, Tile } from "./types";

const STORAGE_KEY = "2048:v1";

interface StoredGame {
  tiles: Tile[];
  score: number;
  status: Status;
  nextId: number;
  previous: Snapshot | null;
  moveCount: number;
}

interface StoredState {
  best: number;
  game: StoredGame | null;
}

const RESUMABLE_STATUSES: Status[] = ["playing", "won", "continued"];

export function loadState(rng: Rng): GameState {
  let best = 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredState;
      if (typeof parsed.best === "number" && Number.isFinite(parsed.best)) {
        best = parsed.best;
      }
      const game = parsed.game;
      if (
        game &&
        Array.isArray(game.tiles) &&
        game.tiles.length > 0 &&
        typeof game.score === "number" &&
        typeof game.nextId === "number" &&
        RESUMABLE_STATUSES.includes(game.status)
      ) {
        return {
          tiles: game.tiles,
          score: game.score,
          best,
          status: game.status,
          nextId: game.nextId,
          previous: game.previous ?? null,
          moveCount: game.moveCount ?? 0,
          lastGain: 0,
        };
      }
    }
  } catch {
    best = 0;
  }
  return createInitialState(best, rng);
}

export function saveState(state: GameState): void {
  const payload: StoredState = {
    best: state.best,
    game: {
      tiles: stripTransient(state.tiles),
      score: state.score,
      status: state.status,
      nextId: state.nextId,
      previous: state.previous,
      moveCount: state.moveCount,
    },
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    return;
  }
}
