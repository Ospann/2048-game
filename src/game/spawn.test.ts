import { describe, expect, it } from "vitest";
import { spawnTile } from "./spawn";
import { queueRng, tilesFrom } from "./testing";

describe("spawnTile", () => {
  it("spawns a 2 when the value roll is below 0.9", () => {
    const result = spawnTile([], 1, queueRng([0, 0.89]));
    expect(result.tiles).toHaveLength(1);
    expect(result.tiles[0].value).toBe(2);
    expect(result.tiles[0].isNew).toBe(true);
    expect(result.nextId).toBe(2);
  });

  it("spawns a 4 when the value roll is 0.9 or above", () => {
    const result = spawnTile([], 1, queueRng([0, 0.91]));
    expect(result.tiles[0].value).toBe(4);
  });

  it("spawns only on the empty cell", () => {
    const { tiles, nextId } = tilesFrom([
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 0],
    ]);
    const result = spawnTile(tiles, nextId, queueRng([0.99, 0.5]));
    const spawned = result.tiles[result.tiles.length - 1];

    expect(result.tiles).toHaveLength(16);
    expect(spawned.row).toBe(3);
    expect(spawned.col).toBe(3);
  });

  it("returns the input unchanged when the board is full", () => {
    const { tiles, nextId } = tilesFrom([
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ]);
    const result = spawnTile(tiles, nextId, queueRng([0, 0]));

    expect(result.tiles).toBe(tiles);
    expect(result.nextId).toBe(nextId);
  });
});
