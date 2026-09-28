import type { ReactElement } from "react";
import { SIZE } from "../../game/board";
import type { Direction, Tile as TileModel } from "../../game/types";
import { useSwipe } from "../../hooks/useSwipe";
import Tile from "../Tile";
import styles from "./index.module.css";

interface BoardProps {
  tiles: TileModel[];
  onMove: (direction: Direction) => void;
}

const CELLS = Array.from({ length: SIZE * SIZE }, (_, index) => index);

export default function Board({ tiles, onMove }: BoardProps): ReactElement {
  const swipeHandlers = useSwipe(onMove);
  const rendered = tiles
    .flatMap((tile) => [...(tile.mergedFrom ?? []), tile])
    .sort((a, b) => a.id - b.id);

  return (
    <div className={styles.board} {...swipeHandlers}>
      <div className={styles.grid}>
        {CELLS.map((cell) => (
          <div key={cell} className={styles.cell} />
        ))}
      </div>
      <div className={styles.tiles}>
        {rendered.map((tile) => (
          <Tile key={tile.id} tile={tile} />
        ))}
      </div>
    </div>
  );
}
