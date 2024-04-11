export const delayReturn = async (time = 2000) => {
  const p = new Promise((res) => {
    setTimeout(() => {
      res(1);
    }, time);
  });
  return await p;
};

export const generateRandomSixDigitString = () => {
  let num = "";
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
};
