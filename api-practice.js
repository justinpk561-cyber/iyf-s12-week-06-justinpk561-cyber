
// WEEK 06 - LESSON 12
// Working with APIs

console.log("Lesson 12: Working with APIs");

// Task 12.1: Fetch API Basics

fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => {
        console.log("Response:", response);
        console.log("Status:", response.status);
        console.log("Success:", response.ok);

        return response.json();
    })
    .then((user) => {
        console.log("User data:", user);
    })
    .catch((error) => {
        console.log("Error:", error);
    });
