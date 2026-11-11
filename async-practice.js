
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


// Task 11.2: Callback Hell

function getUserData(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "Justin" });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        callback(["My first post", "My second post"]);
    }, 1000);
}

function getPostComments(post, callback) {
    setTimeout(() => {
        callback(["Great post!", "Nice work!"]);
    }, 1000);
}

// Nested callbacks
getUserData(1, (user) => {
    console.log("User:", user);

    getUserPosts(user.id, (posts) => {
        console.log("Posts:", posts);

        getPostComments(posts[0], (comments) => {
            console.log("Comments:", comments);
        });
    });
});


// Creating a Promise

function getUserDataPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "Justin"
                });
            } else {
                reject("Invalid user ID!");
            }
        }, 1000);
    });
}

// Using then() and catch()

getUserDataPromise(1)
    .then((user) => {
        console.log("Promise user:", user);
    })
    .catch((error) => {
        console.log("Error:", error);
    });
