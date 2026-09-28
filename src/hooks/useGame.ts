import { useCallback, useEffect, useReducer } from "react";
import { gameReducer, type GameAction } from "../game/reducer";
import { loadState, saveState } from "../game/storage";
import type { Direction, GameState } from "../game/types";

export interface UseGameResult {
  state: GameState;
  move: (direction: Direction) => void;
  newGame: () => void;
  undo: () => void;
  continueGame: () => void;
  canUndo: boolean;
}

function reduce(state: GameState, action: GameAction): GameState {
  return gameReducer(state, action, Math.random);
}

export function useGame(): UseGameResult {
  const [state, dispatch] = useReducer(reduce, undefined, () => loadState(Math.random));

  useEffect(() => {
    saveState(state);
  }, [state]);

  const move = useCallback((direction: Direction) => {
    dispatch({ type: "move", direction });
  }, []);
  const newGame = useCallback(() => {
    dispatch({ type: "newGame" });
  }, []);
  const undo = useCallback(() => {
    dispatch({ type: "undo" });
  }, []);
  const continueGame = useCallback(() => {
    dispatch({ type: "continue" });
  }, []);

  return { state, move, newGame, undo, continueGame, canUndo: state.previous !== null };
}
