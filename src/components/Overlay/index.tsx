import type { ReactElement } from "react";
import styles from "./index.module.css";

interface OverlayProps {
  status: "won" | "over";
  onNewGame: () => void;
  onContinue: () => void;
}

export default function Overlay({ status, onNewGame, onContinue }: OverlayProps): ReactElement {
  const won = status === "won";

  return (
    <div className={`${styles.overlay} ${won ? styles.won : styles.over}`}>
      <p className={styles.title}>{won ? "You win!" : "Game over"}</p>
      <div className={styles.actions}>
        {won && (
          <button type="button" className={styles.primary} onClick={onContinue}>
            Keep going
          </button>
        )}
        <button
          type="button"
          className={won ? styles.secondary : styles.primary}
          onClick={onNewGame}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
