import { SIZE } from "./board";
import type { Rng, Tile } from "./types";

export function tilesFrom(grid: number[][]): { tiles: Tile[]; nextId: number } {
  const tiles: Tile[] = [];
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const value = grid[row]?.[col] ?? 0;
      if (value > 0) {
        tiles.push({ id: row * SIZE + col + 1, value, row, col });
      }
    }
  }
  return { tiles, nextId: SIZE * SIZE + 1 };
}

export function queueRng(values: number[]): Rng {
  const queue = [...values];
  return () => queue.shift() ?? 0;
}

export function valueAt(tiles: Tile[], row: number, col: number): number {
  return tiles.find((tile) => tile.row === row && tile.col === col)?.value ?? 0;
}
