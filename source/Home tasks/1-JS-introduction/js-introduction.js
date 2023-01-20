const myName = 'Samir';
let myAge = 32;
let myScores = 7777777n;
const haveKid = true;
let typeNull = null;
let typeUndefined = undefined;
let myData = {
  name: 'Samir',
  age: 32,
  child: 'Vika',
  musicBand: 'CDC',
};
let myMusic = Symbol('cdc');

console.log(Number(myName), String(myName), Boolean(myName));
console.log(Number(myAge), String(myAge), Boolean(myAge));
console.log(Number(myScores), String(myScores), Boolean(myScores));
console.log(Number(haveKid), String(haveKid), Boolean(haveKid));
console.log(Number(typeNull), String(typeNull), Boolean(typeNull));
console.log(Number(typeUndefined), String(typeUndefined), Boolean(typeUndefined));
console.log(Number(myData), String(myData), Boolean(myData));
console.log(Number(myMusic), String(myMusic), Boolean(myMusic));
