
// WEEK 06 - LESSON 11
// Asynchronous JavaScript

console.log("Lesson 11: Asynchronous JavaScript");

// Task 11.1: Synchronous vs Asynchronous

console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");

setTimeout(() => {
    console.log("D");
}, 100);

console.log("E");
