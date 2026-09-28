import type { Tile } from "./types";

export const SIZE = 4;

export const WIN_VALUE = 2048;

export function toGrid(tiles: Tile[]): (Tile | null)[][] {
  const grid: (Tile | null)[][] = Array.from({ length: SIZE }, () =>
    Array<Tile | null>(SIZE).fill(null),
  );
  for (const tile of tiles) {
    grid[tile.row][tile.col] = tile;
  }
  return grid;
}

export function emptyCells(tiles: Tile[]): { row: number; col: number }[] {
  const grid = toGrid(tiles);
  const cells: { row: number; col: number }[] = [];
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (!grid[row][col]) {
        cells.push({ row, col });
      }
    }
  }
  return cells;
}

export function hasWon(tiles: Tile[]): boolean {
  return tiles.some((tile) => tile.value >= WIN_VALUE);
}

export function canMove(tiles: Tile[]): boolean {
  const grid = toGrid(tiles);
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const tile = grid[row][col];
      if (!tile) return true;
      if (col + 1 < SIZE && grid[row][col + 1]?.value === tile.value) return true;
      if (row + 1 < SIZE && grid[row + 1][col]?.value === tile.value) return true;
    }
  }
  return false;
}

export function stripTransient(tiles: Tile[]): Tile[] {
  return tiles.map(({ id, value, row, col }) => ({ id, value, row, col }));
}
