function getNumbersFromString(str) {
  return str.match(/(\d+(\.\d+)?)/g)
            .map(v => +v);
}
export {
  getNumbersFromString
}
