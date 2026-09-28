export type Direction = "up" | "down" | "left" | "right";

export type Status = "playing" | "won" | "continued" | "over";

export interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  mergedFrom?: [Tile, Tile];
}

export interface Snapshot {
  tiles: Tile[];
  score: number;
  status: Status;
}

export interface GameState {
  tiles: Tile[];
  score: number;
  best: number;
  status: Status;
  nextId: number;
  previous: Snapshot | null;
  moveCount: number;
  lastGain: number;
}

export type Rng = () => number;
