/*Задание 1*/
validateAge();

function validateAge() {
  let userAge = prompt(`Введите ваш возраст`);
  if (userAge >= 18) {
    alert("Вы достаточно зрелый");
  } else {
    alert("Вы ещё зеленый");
    validateAge();
  }
}
