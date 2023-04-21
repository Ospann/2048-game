// Grab random start number
const randomStartingNumber = () => {
  const startingNumbers = [2, 4];
  const randomNumber =
    startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
  return randomNumber;
};

export default randomStartingNumber;
