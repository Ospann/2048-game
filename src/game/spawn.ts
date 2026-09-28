import { emptyCells } from "./board";
import type { Rng, Tile } from "./types";

export function spawnTile(
  tiles: Tile[],
  nextId: number,
  rng: Rng,
): { tiles: Tile[]; nextId: number } {
  const empties = emptyCells(tiles);
  if (empties.length === 0) {
    return { tiles, nextId };
  }
  const cell = empties[Math.floor(rng() * empties.length)];
  const value = rng() < 0.9 ? 2 : 4;
  const tile: Tile = { id: nextId, value, row: cell.row, col: cell.col, isNew: true };
  return { tiles: [...tiles, tile], nextId: nextId + 1 };
}
