import boardMoved from "./checkChange";
import placeRandom from "./placeRandom";
import {
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  checkForGameOver,
} from "./moveHelpers";

const Move = (
  direction: string,
  Board: number[][],
  setBoard: (board:number[][]) => void,
  setScore: (score: number) => void,
  setGameOver: (gameOver:boolean) => void,
  Score: number
) => {
  console.log(direction);
  if (direction === "up") {
    const movedUp = moveUp(Board);
    if (boardMoved(Board, movedUp.board)) {
      const upWithRandom = placeRandom(movedUp.board);

      if (checkForGameOver(upWithRandom)) {
        setBoard(upWithRandom);
        setGameOver(true);
      } else {
        setBoard(upWithRandom);
        setScore(Score + movedUp.score);
      }
    }
  } else if (direction === "right") {
    const movedRight = moveRight(Board);
    if (boardMoved(Board, movedRight.board)) {
      const rightWithRandom = placeRandom(movedRight.board);

      if (checkForGameOver(rightWithRandom)) {
        setBoard(rightWithRandom);
        setGameOver(true);
      } else {
        setBoard(rightWithRandom);
        setScore(Score + movedRight.score);
      }
    }
  } else if (direction === "down") {
    const movedDown = moveDown(Board);
    if (boardMoved(Board, movedDown.board)) {
      const downWithRandom = placeRandom(movedDown.board);

      if (checkForGameOver(downWithRandom)) {
        setBoard(downWithRandom);
        setGameOver(true);
      } else {
        setBoard(downWithRandom);
        setScore(Score + movedDown.score);
      }
    }
  } else if (direction === "left") {
    const movedLeft = moveLeft(Board);
    if (boardMoved(Board, movedLeft.board)) {
      const leftWithRandom = placeRandom(movedLeft.board);

      if (checkForGameOver(leftWithRandom)) {
        setBoard(leftWithRandom);
        setGameOver(true);
      } else {
        setBoard(leftWithRandom);
        setScore(Score + movedLeft.score);
      }
    }
  }
};

export default Move;
