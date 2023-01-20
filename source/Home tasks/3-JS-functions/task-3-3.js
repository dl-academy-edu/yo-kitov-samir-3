/*Задание 3*/
const add = addCreator(5);
console.log(add(5)); //10

console.log(addCreator(1)(3)); //4

function addCreator(valueOne) {
  return function sum(valueTwo) {
    return valueTwo + valueOne;
  };
}
