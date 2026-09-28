import { describe, expect, it } from "vitest";
import { applyMove } from "./move";
import { tilesFrom, valueAt } from "./testing";

describe("applyMove", () => {
  it("merges an equal pair and reports gained score", () => {
    const { tiles, nextId } = tilesFrom([
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const result = applyMove(tiles, "left", nextId);

    expect(result.moved).toBe(true);
    expect(result.gained).toBe(4);
    expect(result.tiles).toHaveLength(1);

    const merged = result.tiles[0];
    expect(merged.value).toBe(4);
    expect(merged.row).toBe(0);
    expect(merged.col).toBe(0);
    expect(merged.id).toBe(nextId);
    expect(result.nextId).toBe(nextId + 1);

    const sources = merged.mergedFrom;
    expect(sources).toBeDefined();
    expect(sources?.map((tile) => tile.id).sort()).toEqual([1, 2]);
    for (const source of sources ?? []) {
      expect(source.row).toBe(0);
      expect(source.col).toBe(0);
    }
  });

  it("merges each tile at most once: [2,2,2,2] -> [4,4]", () => {
    const { tiles, nextId } = tilesFrom([
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const result = applyMove(tiles, "left", nextId);

    expect(result.tiles).toHaveLength(2);
    expect(valueAt(result.tiles, 0, 0)).toBe(4);
    expect(valueAt(result.tiles, 0, 1)).toBe(4);
    expect(result.gained).toBe(8);
  });

  it("does not merge a freshly merged tile with the next tile: [2,2,4] -> [4,4]", () => {
    const { tiles, nextId } = tilesFrom([
      [2, 2, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const result = applyMove(tiles, "left", nextId);

    expect(result.tiles).toHaveLength(2);
    expect(valueAt(result.tiles, 0, 0)).toBe(4);
    expect(valueAt(result.tiles, 0, 1)).toBe(4);
    expect(result.gained).toBe(4);
  });

  it("merges the far pair first: [4,2,2] -> [4,4]", () => {
    const { tiles, nextId } = tilesFrom([
      [4, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const result = applyMove(tiles, "left", nextId);

    expect(result.tiles).toHaveLength(2);
    expect(valueAt(result.tiles, 0, 0)).toBe(4);
    expect(valueAt(result.tiles, 0, 1)).toBe(4);
    expect(result.gained).toBe(4);
  });

  it("reports moved=false when nothing changes", () => {
    const { tiles, nextId } = tilesFrom([
      [2, 4, 8, 16],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const result = applyMove(tiles, "left", nextId);

    expect(result.moved).toBe(false);
    expect(result.gained).toBe(0);
  });

  it("preserves tile identity when sliding without merging", () => {
    const { tiles, nextId } = tilesFrom([
      [0, 0, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const original = tiles[0];
    const result = applyMove(tiles, "left", nextId);

    expect(result.tiles).toHaveLength(1);
    expect(result.tiles[0].id).toBe(original.id);
    expect(result.tiles[0].col).toBe(0);
    expect(result.tiles[0].mergedFrom).toBeUndefined();
  });

  it.each([
    ["left", 1, 0],
    ["right", 1, 3],
    ["up", 0, 2],
    ["down", 3, 2],
  ] as const)("moves a single tile %s to (%i,%i)", (direction, row, col) => {
    const { tiles, nextId } = tilesFrom([
      [0, 0, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const result = applyMove(tiles, direction, nextId);

    expect(result.tiles).toHaveLength(1);
    expect(result.tiles[0].row).toBe(row);
    expect(result.tiles[0].col).toBe(col);
  });
});
