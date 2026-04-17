const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'strawberry']; //array of strings
const numbers = [2, 4, 6, 8];
const prices = [10, 25, 5, 40, 15];

const strings = ['abc', 'def', 'hij'];

let fruitslength = fruits.length; //length of the fruits array
let fruitArray = (fruitslength + 1)
console.log(`The length of the fruits array is ${fruitslength}.`); // this will print "The length of the fruits array is 6." to the console

console.log(fruits[5]);
console.log(numbers[2]);

for (let i = 0; i < fruits.length; i++) {
    const element = fruits[i];
    console.log(element);
}

for (const fruit of fruits) {
    console.log(fruit);
}

const emptyArray = [];
emptyArray.push('first element');
emptyArray.push(5);
console.log(emptyArray);

console.log(fruits);

uppercaseFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(uppercaseFruits);