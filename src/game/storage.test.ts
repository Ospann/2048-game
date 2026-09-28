import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadState, saveState } from "./storage";
import { queueRng, tilesFrom } from "./testing";
import type { GameState } from "./types";

const FRESH_RNG = [0, 0.5, 0, 0.5];

function makeState(extra?: Partial<GameState>): GameState {
  const { tiles, nextId } = tilesFrom([
    [2, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  return {
    tiles,
    score: 12,
    best: 100,
    status: "playing",
    nextId,
    previous: null,
    moveCount: 3,
    lastGain: 4,
    ...extra,
  };
}

beforeEach(() => {
  const store = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
    key: () => null,
    length: 0,
  });
});

describe("storage", () => {
  it("round-trips a running game", () => {
    const state = makeState();
    saveState(state);
    const loaded = loadState(queueRng(FRESH_RNG));

    expect(loaded.tiles).toEqual(state.tiles);
    expect(loaded.score).toBe(12);
    expect(loaded.best).toBe(100);
    expect(loaded.status).toBe("playing");
    expect(loaded.nextId).toBe(state.nextId);
  });

  it("starts fresh on corrupt payload", () => {
    localStorage.setItem("2048:v1", "{not json");
    const loaded = loadState(queueRng(FRESH_RNG));

    expect(loaded.tiles).toHaveLength(2);
    expect(loaded.score).toBe(0);
    expect(loaded.best).toBe(0);
  });

  it("does not resume a finished game but keeps best", () => {
    saveState(makeState({ status: "over", best: 555 }));
    const loaded = loadState(queueRng(FRESH_RNG));

    expect(loaded.tiles).toHaveLength(2);
    expect(loaded.score).toBe(0);
    expect(loaded.best).toBe(555);
    expect(loaded.status).toBe("playing");
  });

  it("strips transient animation flags before saving", () => {
    const state = makeState();
    state.tiles[0] = { ...state.tiles[0], isNew: true };
    saveState(state);

    const raw = localStorage.getItem("2048:v1") ?? "";
    expect(raw).not.toContain("isNew");
    expect(raw).not.toContain("mergedFrom");
  });

  it("starts fresh when nothing is stored", () => {
    const loaded = loadState(queueRng(FRESH_RNG));

    expect(loaded.tiles).toHaveLength(2);
    expect(loaded.best).toBe(0);
  });
});
