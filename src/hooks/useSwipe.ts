import { useCallback, useRef } from "react";
import type { PointerEvent } from "react";
import type { Direction } from "../game/types";

export interface SwipeHandlers {
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
}

const MIN_DISTANCE = 30;
const AXIS_DOMINANCE = 1.5;

export function useSwipe(move: (direction: Direction) => void): SwipeHandlers {
  const start = useRef<{ x: number; y: number; id: number } | null>(null);

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    start.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  }, []);

  const onPointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const origin = start.current;
      start.current = null;
      if (!origin || origin.id !== event.pointerId) {
        return;
      }
      const dx = event.clientX - origin.x;
      const dy = event.clientY - origin.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      if (Math.max(absX, absY) < MIN_DISTANCE) {
        return;
      }
      if (absX >= absY * AXIS_DOMINANCE) {
        move(dx > 0 ? "right" : "left");
      } else if (absY >= absX * AXIS_DOMINANCE) {
        move(dy > 0 ? "down" : "up");
      }
    },
    [move],
  );

  return { onPointerDown, onPointerUp };
}
