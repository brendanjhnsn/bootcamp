// functions = a group of steps that you can reuse over and over again
// dry = don't repeat yourself

// function declaration
function sayHello() { // function keyword, name of the function, parentheses, curly braces
    console.log("Hello!"); // console.log is a built in function that prints to the console
} // this function doesn't take any parameters, and doesn't return anything

// to call a function, you use the name of the function followed by parentheses
sayHello(); // this will print "Hello!" to the console

// Syntax of functions
// function nameOfFunction(parameters) {
//     // code to be executed
// }

// Function is similiar to the let and const keywords
// in that you can use them to create reusable code, and they can be called multiple times

function openDoor() { // The openDoor is a action name or a camel case. The parentheses are parameters -> inside we have parameters when they are not empty. They can be optional
    return "You opened the door!";
}

console.log(openDoor()); // this will print "You opened the door!" to the console
openDoor(); // this will return "You opened the door!" but it won't print it to the console because we didn't use console.log

// Anything between {} is the function body, where you define what the function should do

function add(x, y) { // x and y are parameters, they are placeholders for the values that will be passed in when the function is called
    return x + y; // this will return the sum of x and y
}

console.log(add(1, 2)); // this will print 3 to the console, because we are passing in 1 and 2 as arguments to the function

// Callback functions -> Functions that are passed to other functions and called later on.
// Used in higher order functions -> Functions that take in or return other functions


// Callback Function 1
// Example of a higher order function that takes in a callback function 
function greet(name, callback) { // name is a parameter, callback is a parameter that will be a function
    const message = `Hello, ${name}!`;
    callback(message); // this will call the callback function and pass in the message as an argument
}

// Callback Function 2
// Example of a callback function
function printMessage(message) { // message is a parameter that will be passed in when the function is called
    console.log(message); // this will print the message to the console
}

function greetUser(name, callbackFunction) { // name is a parameter, callbackFunction is a parameter that will be a function
    console.log("Processing Greeting..."); // this will print "Processing Greeting..." to the console

    //Decides when to call the callbackFunction
    callbackFunction(name); // Determines when to call the callbackFunction is ran.

    console.log("greeting complete!"); // this will print "greeting complete!" to the console
}

// As a developer when we use a function with a callback we can decide what the function does
// What the function does (but there is a contract sometimes.)
// But it might expect sayHello to return a specific value

// ONe of these IS wrong

// Version A
greetUser("Bob", sayHello());

// Version B
greetUser("Bob", greet); 