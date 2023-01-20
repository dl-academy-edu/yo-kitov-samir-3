/*Задание 3*/
console.log(`Задание 3`);

let userValue = prompt(`Введите число в формате числа`);
let degree = prompt(`Введите значение степени в формате числа`);

for (;;) {
  if (isNaN(userValue) || isNaN(degree) || degree < 0) {
    console.log(
      `Введенное значение имеет неверный тип данных или значение degree меньше 0.`
    );
    userValue = prompt(`Введите число в формате число`);
    degree = prompt(`Введите значение степени в формате число`);
  } else {
    let result;
    if (degree == 0) {
      result = 1;
    } else {
      result = userValue;
      for (let i = 1; i < degree; i++) {
        result *= userValue;
      }
    }
    console.log(`Полученное значение: ${result}`);
    break;
  }
}
