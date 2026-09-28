import { describe, expect, it } from "vitest";
import { canMove, hasWon, stripTransient } from "./board";
import { tilesFrom } from "./testing";

describe("canMove", () => {
  it("returns false for a full board without adjacent equal pairs", () => {
    const { tiles } = tilesFrom([
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ]);
    expect(canMove(tiles)).toBe(false);
  });

  it("returns true when an empty cell exists", () => {
    const { tiles } = tilesFrom([
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 0],
    ]);
    expect(canMove(tiles)).toBe(true);
  });

  it("returns true for a full board with an adjacent equal pair", () => {
    const { tiles } = tilesFrom([
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 4, 8],
      [4, 2, 8, 2],
    ]);
    expect(canMove(tiles)).toBe(true);
  });
});

describe("hasWon", () => {
  it("detects a 2048 tile", () => {
    const { tiles } = tilesFrom([
      [2048, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(hasWon(tiles)).toBe(true);
  });

  it("returns false below 2048", () => {
    const { tiles } = tilesFrom([
      [1024, 1024, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(hasWon(tiles)).toBe(false);
  });
});

describe("stripTransient", () => {
  it("drops isNew and mergedFrom", () => {
    const { tiles } = tilesFrom([
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const decorated = [{ ...tiles[0], isNew: true, mergedFrom: [tiles[0], tiles[0]] as const }];
    const stripped = stripTransient(decorated as never);

    expect(stripped[0].isNew).toBeUndefined();
    expect(stripped[0].mergedFrom).toBeUndefined();
    expect(stripped[0].id).toBe(tiles[0].id);
  });
});
