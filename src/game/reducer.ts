import { canMove, hasWon, stripTransient } from "./board";
import { applyMove } from "./move";
import { spawnTile } from "./spawn";
import type { Direction, GameState, Rng, Status } from "./types";

export type GameAction =
  | { type: "move"; direction: Direction }
  | { type: "newGame" }
  | { type: "undo" }
  | { type: "continue" };

export function createInitialState(best: number, rng: Rng): GameState {
  const first = spawnTile([], 1, rng);
  const second = spawnTile(first.tiles, first.nextId, rng);
  return {
    tiles: second.tiles,
    score: 0,
    best,
    status: "playing",
    nextId: second.nextId,
    previous: null,
    moveCount: 0,
    lastGain: 0,
  };
}

export function gameReducer(
  state: GameState,
  action: GameAction,
  rng: Rng = Math.random,
): GameState {
  switch (action.type) {
    case "move": {
      if (state.status === "over" || state.status === "won") {
        return state;
      }
      const moveResult = applyMove(state.tiles, action.direction, state.nextId);
      if (!moveResult.moved) {
        return state;
      }
      const previous = {
        tiles: stripTransient(state.tiles),
        score: state.score,
        status: state.status,
      };
      const spawned = spawnTile(moveResult.tiles, moveResult.nextId, rng);
      const score = state.score + moveResult.gained;
      const best = Math.max(state.best, score);
      let status: Status = state.status;
      if (status === "playing" && hasWon(spawned.tiles)) {
        status = "won";
      } else if (!canMove(spawned.tiles)) {
        status = "over";
      }
      return {
        tiles: spawned.tiles,
        score,
        best,
        status,
        nextId: spawned.nextId,
        previous,
        moveCount: state.moveCount + 1,
        lastGain: moveResult.gained,
      };
    }
    case "newGame":
      return createInitialState(state.best, rng);
    case "undo": {
      if (!state.previous) {
        return state;
      }
      return {
        ...state,
        tiles: state.previous.tiles,
        score: state.previous.score,
        status: state.previous.status,
        previous: null,
        lastGain: 0,
      };
    }
    case "continue":
      return state.status === "won" ? { ...state, status: "continued" } : state;
  }
}
