type Board = number[][];

const getBlankCoordinates = (board: Board) => {
  const blankCoordinates = [];

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) {
        blankCoordinates.push([r, c]);
      }
    }
  }

  return blankCoordinates;
};

export default getBlankCoordinates;
