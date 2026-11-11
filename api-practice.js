
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

// Fetch a user using async/await

async function getUser(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        const user = await response.json();

        console.log("Fetched user:", user);

        return user;

    } catch (error) {
        console.log("Error:", error.message);
    }
}

getUser(1);


// Fetch all users from the API

async function getAllUsers() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        console.log("All users:", users);

    } catch (error) {
        console.log("Error:", error.message);
    }
}

getAllUsers();
