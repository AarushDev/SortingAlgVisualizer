function CreateBars() {
  let myArr = [];
  for (let i = 0; i < 10; i++) {
    const randomNum = Math.floor(Math.random() * 200) + 21;
    myArr.push({ value: randomNum, state: "idle" });
  }

  return myArr;
}

export default CreateBars;
