import type { ReactElement } from "react";
import styles from "./index.module.css";

interface HeaderProps {
  score: number;
  best: number;
  lastGain: number;
  moveCount: number;
  canUndo: boolean;
  onNewGame: () => void;
  onUndo: () => void;
}

interface ScoreBoxProps {
  label: string;
  value: number;
  gain?: number;
  gainKey?: number;
}

function ScoreBox({ label, value, gain = 0, gainKey = 0 }: ScoreBoxProps): ReactElement {
  return (
    <div className={styles.scoreBox}>
      <span className={styles.scoreLabel}>{label}</span>
      <span className={styles.scoreValue}>{value}</span>
      {gain > 0 && (
        <span key={gainKey} className={styles.gain}>
          +{gain}
        </span>
      )}
    </div>
  );
}

export default function Header({
  score,
  best,
  lastGain,
  moveCount,
  canUndo,
  onNewGame,
  onUndo,
}: HeaderProps): ReactElement {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.title}>2048</h1>
        <div className={styles.scores}>
          <ScoreBox label="Score" value={score} gain={lastGain} gainKey={moveCount} />
          <ScoreBox label="Best" value={best} />
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.tagline}>Join the tiles, reach 2048</p>
        <div className={styles.actions}>
          <button type="button" className={styles.button} onClick={onUndo} disabled={!canUndo}>
            Undo
          </button>
          <button type="button" className={styles.button} onClick={onNewGame}>
            New game
          </button>
        </div>
      </div>
    </header>
  );
}
