import { create } from "zustand";

type GameStore = {
  Board: number[][];
  setBoard: (board: number[][]) => void;
  Score: number;
  setScore: (score: number) => void;
  gameOver: boolean;
  setGameOver: (gameOver: boolean) => void;
};

const useGameStore = create<GameStore>((set) => ({
  Board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  setBoard: (board) => {
    set({ Board: board });
  },
  gameOver: false,
  setGameOver: (gameOver) => {
    set({ gameOver });
  },
  Score: 0,
  setScore: (score) => {
    set({ Score: score });
  },
}));

export default useGameStore;
