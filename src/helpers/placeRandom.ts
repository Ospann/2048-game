import randomStarting from "./randomStart";
import getBlankCoordinates from "./getBlanks";

const placeRandom = (inputBoard: number[][]) => {
  const blankCoordinates = getBlankCoordinates(inputBoard);
  const randomCoordinate =
    blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
  const randomNumber = randomStarting();
  inputBoard[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
  return inputBoard;
};

export default placeRandom;
