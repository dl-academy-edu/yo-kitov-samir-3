/*Задание 5*/
console.log(`Задание 5`);

let randomValue = Math.floor(1 + Math.random() * 10);
console.log(`Загаданное число: ${randomValue}`);
let userValue = prompt(`Угадайте число. Введите целое число от 1 до 10`);

for (;;) {
  console.log(`Введенное число: ${userValue}`);
  if (
    userValue !== NaN &&
    userValue >= 1 &&
    userValue < 11 &&
    userValue % 1 === 0
  ) {
    console.log(`Корректный ввод`);
    if (userValue == randomValue) {
      alert(`Вы угадали! Возьмите с полки пирожок!`);
      console.log(`Угадали`);
      break;
    } else {
      userValue = prompt(
        `Не угадали. Попробуйте ещё раз. Введите целое число от 1 до 10`
      );
    }
  } else {
    console.log(`Ошибка ввода`);
    userValue = prompt(
      `Число введено не корректно. Введите в числовом формате целое число от 1 до 10`
    );
  }
}
