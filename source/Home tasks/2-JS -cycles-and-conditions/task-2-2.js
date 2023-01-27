/*Задание 2*/
console.log(`Задание 2`);

let userValue = prompt(`Введите значение в формате число`);

for (let i = 0; ; i++) {
  if (!Number(userValue)) {
    console.log(`Введенное значение имеет неверный тип данных.`);
    userValue = prompt(`Введите значение в формате число`);
  } else {
    break;
  }
}

let factorial = 1;
let i = 1;
while (i <= userValue) {
  factorial *= i;
  i++;
}
if (factorial > 1) {
  console.log(`Факториалом числа ${userValue} является число: ${factorial}`);
}
