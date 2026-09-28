import type { ReactElement } from "react";
import { useGame } from "../../hooks/useGame";
import { useKeyboard } from "../../hooks/useKeyboard";
import Board from "../Board";
import Header from "../Header";
import Overlay from "../Overlay";
import styles from "./index.module.css";

export default function Game(): ReactElement {
  const { state, move, newGame, undo, continueGame, canUndo } = useGame();
  useKeyboard(move);
  const showOverlay = state.status === "won" || state.status === "over";

  return (
    <main className={styles.game}>
      <Header
        score={state.score}
        best={state.best}
        lastGain={state.lastGain}
        moveCount={state.moveCount}
        canUndo={canUndo}
        onNewGame={newGame}
        onUndo={undo}
      />
      <div className={styles.boardWrap}>
        <Board tiles={state.tiles} onMove={move} />
        {showOverlay && (
          <Overlay
            status={state.status === "won" ? "won" : "over"}
            onNewGame={newGame}
            onContinue={continueGame}
          />
        )}
      </div>
      <p className={styles.hint}>Arrow keys, WASD or swipe</p>
    </main>
  );
}
