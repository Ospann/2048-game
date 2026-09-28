import { SIZE, stripTransient, toGrid } from "./board";
import type { Direction, Tile } from "./types";

export interface MoveResult {
  tiles: Tile[];
  gained: number;
  moved: boolean;
  nextId: number;
}

function cellAt(direction: Direction, line: number, index: number): { row: number; col: number } {
  switch (direction) {
    case "left":
      return { row: line, col: index };
    case "right":
      return { row: line, col: SIZE - 1 - index };
    case "up":
      return { row: index, col: line };
    case "down":
      return { row: SIZE - 1 - index, col: line };
  }
}

export function applyMove(tiles: Tile[], direction: Direction, nextId: number): MoveResult {
  const grid = toGrid(stripTransient(tiles));
  const result: Tile[] = [];
  let gained = 0;
  let moved = false;
  let id = nextId;

  for (let line = 0; line < SIZE; line++) {
    const source: Tile[] = [];
    for (let index = 0; index < SIZE; index++) {
      const { row, col } = cellAt(direction, line, index);
      const tile = grid[row][col];
      if (tile) source.push(tile);
    }

    const out: Tile[] = [];
    for (const tile of source) {
      const prev = out[out.length - 1];
      if (prev && prev.value === tile.value && !prev.mergedFrom) {
        const merged: Tile = {
          id: id++,
          value: tile.value * 2,
          row: prev.row,
          col: prev.col,
          mergedFrom: [prev, { ...tile }],
        };
        out[out.length - 1] = merged;
        gained += merged.value;
      } else {
        out.push({ ...tile });
      }
    }

    out.forEach((tile, index) => {
      const { row, col } = cellAt(direction, line, index);
      if (tile.mergedFrom) {
        const [first, second] = tile.mergedFrom;
        tile.mergedFrom = [
          { ...first, row, col },
          { ...second, row, col },
        ];
        moved = true;
      } else if (tile.row !== row || tile.col !== col) {
        moved = true;
      }
      tile.row = row;
      tile.col = col;
      result.push(tile);
    });
  }

  return { tiles: result, gained, moved, nextId: id };
}
