const fruits = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "strawberry",
]; //array of strings
const numbers = [2, 4, 6, 8];
const prices = [10, 25, 5, 40, 15, 30];

const strings = ["abc", "Def", "hij"];

console.log(`The length of the fruits array is ${fruits.length}.`); // this will print "The length of the fruits array is 6." to the console

console.log(fruits[5]);
console.log(numbers[2]);

for (let i = 0; i < fruits.length; i++) {
  const element = fruits[i];
  console.log(element);
}

console.log("---");

for (const fruit of fruits) {
  console.log(fruit);
}

const emptyArray = [];
emptyArray.push("first element");
emptyArray.push(5);
emptyArray.push(false);
console.log(emptyArray);

console.log(fruits);

const uppercaseFruits = fruits.map((fruit) => fruit.toUpperCase());
console.log(uppercaseFruits);

const expensivePrices = prices.filter((p) => p > 20);
console.log(expensivePrices);

const totalPrice = prices.reduce((acc, p) => acc + p, 0);
console.log(totalPrice);

const capitalizedStrings = fruits.map(
  (fruit) => fruit.charAt(0).toUpperCase() + fruit.slice(1),
);
console.log(capitalizedStrings);

const capitalizedFruits = strings.map(
  (s) => s.charAt(0).toUpperCase() + s.slice(1),
);
console.log(capitalizedFruits);
