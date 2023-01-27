/*Задание 1*/
console.log(`Задание 1`);

let userValue = prompt(`Введите число больше 0`);
for (;;) {
  if (!Number(userValue) || userValue <= 0) {
    console.log(
      `Введенное значение имеет неверный тип данных или значение меньше 0.`
    );
    userValue = prompt(`Введите число больше 0`);
  } else {
    break;
  }
}
for (let i = 1; i < userValue; i++) {
  if (i % 4 !== 0) {
    console.log(i);
  }
}
