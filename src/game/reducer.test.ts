import { describe, expect, it } from "vitest";
import { createInitialState, gameReducer } from "./reducer";
import { queueRng, tilesFrom, valueAt } from "./testing";
import type { GameState } from "./types";

function stateFrom(grid: number[][], extra?: Partial<GameState>): GameState {
  const { tiles, nextId } = tilesFrom(grid);
  return {
    tiles,
    score: 0,
    best: 0,
    status: "playing",
    nextId,
    previous: null,
    moveCount: 0,
    lastGain: 0,
    ...extra,
  };
}

describe("createInitialState", () => {
  it("spawns exactly two tiles with zero score", () => {
    const state = createInitialState(50, queueRng([0, 0.5, 0, 0.5]));

    expect(state.tiles).toHaveLength(2);
    expect(state.score).toBe(0);
    expect(state.best).toBe(50);
    expect(state.status).toBe("playing");
    expect(state.previous).toBeNull();
  });
});

describe("gameReducer move", () => {
  it("returns the same state when the move changes nothing", () => {
    const state = stateFrom([
      [2, 4, 8, 16],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const next = gameReducer(state, { type: "move", direction: "left" }, queueRng([0, 0]));

    expect(next).toBe(state);
  });

  it("adds gained score, spawns a tile and stores an undo snapshot", () => {
    const state = stateFrom([
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const next = gameReducer(state, { type: "move", direction: "left" }, queueRng([0, 0.5]));

    expect(next.score).toBe(4);
    expect(next.best).toBe(4);
    expect(next.lastGain).toBe(4);
    expect(next.moveCount).toBe(1);
    expect(next.tiles).toHaveLength(2);
    expect(next.previous?.score).toBe(0);
    expect(next.previous?.tiles).toHaveLength(2);
  });

  it("keeps the score earned by a losing move", () => {
    const state = stateFrom([
      [2, 2, 8, 16],
      [32, 64, 128, 256],
      [64, 128, 256, 512],
      [128, 256, 512, 1024],
    ]);
    const next = gameReducer(state, { type: "move", direction: "left" }, queueRng([0, 0.5]));

    expect(next.status).toBe("over");
    expect(next.score).toBe(4);
    expect(next.best).toBe(4);
  });

  it("sets won status on reaching 2048 and ignores moves until continue", () => {
    const state = stateFrom([
      [1024, 1024, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const won = gameReducer(state, { type: "move", direction: "left" }, queueRng([0, 0.5]));
    expect(won.status).toBe("won");
    expect(valueAt(won.tiles, 0, 0)).toBe(2048);

    const blocked = gameReducer(won, { type: "move", direction: "right" }, queueRng([0, 0.5]));
    expect(blocked).toBe(won);

    const continued = gameReducer(won, { type: "continue" });
    expect(continued.status).toBe("continued");

    const after = gameReducer(continued, { type: "move", direction: "right" }, queueRng([0, 0.5]));
    expect(after.moveCount).toBe(continued.moveCount + 1);
  });

  it("stays continued when merging past 2048", () => {
    const state = stateFrom(
      [
        [2048, 2048, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      { status: "continued" },
    );
    const next = gameReducer(state, { type: "move", direction: "left" }, queueRng([0, 0.5]));

    expect(next.status).toBe("continued");
    expect(valueAt(next.tiles, 0, 0)).toBe(4096);
  });

  it("ignores moves when the game is over", () => {
    const state = stateFrom(
      [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2],
      ],
      { status: "over" },
    );
    const next = gameReducer(state, { type: "move", direction: "left" }, queueRng([0, 0]));

    expect(next).toBe(state);
  });
});

describe("gameReducer undo", () => {
  it("restores the previous board and score but keeps best", () => {
    const state = stateFrom([
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const moved = gameReducer(state, { type: "move", direction: "left" }, queueRng([0, 0.5]));
    const undone = gameReducer(moved, { type: "undo" });

    expect(undone.score).toBe(0);
    expect(undone.best).toBe(4);
    expect(undone.tiles).toHaveLength(2);
    expect(valueAt(undone.tiles, 0, 0)).toBe(2);
    expect(valueAt(undone.tiles, 0, 1)).toBe(2);
    expect(undone.previous).toBeNull();

    const again = gameReducer(undone, { type: "undo" });
    expect(again).toBe(undone);
  });
});

describe("gameReducer newGame", () => {
  it("resets the board and score but keeps best", () => {
    const state = stateFrom(
      [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      { score: 100, best: 200 },
    );
    const next = gameReducer(state, { type: "newGame" }, queueRng([0, 0.5, 0, 0.5]));

    expect(next.tiles).toHaveLength(2);
    expect(next.score).toBe(0);
    expect(next.best).toBe(200);
    expect(next.status).toBe("playing");
  });
});
