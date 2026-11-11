
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


// Callback function example

function fetchData(callback) {
    console.log("Fetching data...");

    setTimeout(() => {
        const data = "Data received successfully!";
        callback(data);
    }, 2000);
}

fetchData((result) => {
    console.log(result);
});

// Load user example

function loadUser(userId, callback) {
    console.log("Loading user...");

    setTimeout(() => {
        const user = {
            id: userId,
            name: "Justin"
        };

        callback(user);
    }, 1500);
}

loadUser(1, (user) => {
    console.log("User:", user);
});
