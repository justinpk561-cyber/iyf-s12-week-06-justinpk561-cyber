
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


// Fetch posts belonging to a specific user

async function getUserPosts(userId) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const posts = await response.json();

        console.log("User posts:", posts);

    } catch (error) {
        console.log("Error:", error.message);
    }
}

getUserPosts(1);


// DAILY CHALLENGE - DAY 3
// Error Handling with Default User

async function fetchUserOrDefault(userId) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        if (response.status === 404) {
            console.log("User not found. Returning default user.");

            return {
                id: 0,
                name: "Guest User",
                email: "guest@example.com"
            };
        }

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        return await response.json();

    } catch (error) {
        console.log("Error:", error.message);

        return {
            id: 0,
            name: "Guest User",
            email: "guest@example.com"
        };
    }
}

// Test with an existing user
fetchUserOrDefault(1).then((user) => {
    console.log("User:", user);
});

// Test with a non-existing user
fetchUserOrDefault(999).then((user) => {
    console.log("Default user:", user);
});
                
