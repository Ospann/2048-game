const boardMoved = (original: number[][], updated: number[][]) => {
  return JSON.stringify(updated) !== JSON.stringify(original);
};

export default boardMoved;
