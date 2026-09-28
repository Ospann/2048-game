import { useEffect } from "react";
import type { Direction } from "../game/types";

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  a: "left",
  s: "down",
  d: "right",
  W: "up",
  A: "left",
  S: "down",
  D: "right",
  ц: "up",
  ф: "left",
  ы: "down",
  в: "right",
  Ц: "up",
  Ф: "left",
  Ы: "down",
  В: "right",
};

export function useKeyboard(move: (direction: Direction) => void): void {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      const direction = KEY_MAP[event.key];
      if (!direction) {
        return;
      }
      event.preventDefault();
      move(direction);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [move]);
}
