import useGameStore from "../store/Game.store";
import placeRandom from "./placeRandom";

const Initialize = () => {
  const { setBoard, setScore, setGameOver } = useGameStore();

  let newBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  newBoard = placeRandom(placeRandom(newBoard));
  console.log(newBoard);
  setBoard(newBoard);
  setScore(0);
  setGameOver(false);
};

export default Initialize;
