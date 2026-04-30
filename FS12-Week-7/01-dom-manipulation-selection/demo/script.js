//test that we have script.js connect correctly
console.log("Hello World")

// Lets change the H!
// "Welcome to My Website"


// Baby steps with Dom manipulation
// step 1 - open chrome dev tools console
// step 2 - document.querySelector("h1")
// step 3 - apply it to a variable and then put the variable into the console
//          const h1Element = document.querySelector("h1");
//          h1Element 
//          you will see the h1 selected in the viewport
// step 4 - copy that one line for the variable to your script.js
// step 5-  test this line h1Element.textContent = "It's Alive!!!!";
// step 6 - if change worked copy line back to script.js
const h1Element = document.querySelector("h1");
h1Element.textContent = "It's Alive!!!!";

// Element, NodeList, HTMLCollection

// Nodelists are returned by querySelectorAll and are static - they do not update if the DOM changes
//  Array.from(NodeList) - To access a single node/element
const h2NodeList = document.querySelectorAll("h2");
const h2Array = Array.from(h2NodeList);
console.log(h2Array[0]);