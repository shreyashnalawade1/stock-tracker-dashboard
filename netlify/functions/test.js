const curDate = new Date();
const date = `${curDate.getFullYear()}-${curDate.getMonth() + 1}-${
  curDate.getDate() - 1
}`;

console.log(date);
