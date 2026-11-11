
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


// Refactoring callbacks into Promises

function getUserDataAsync(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: "Justin" });
        }, 1000);
    });
}

function getUserPostsAsync(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["My first post", "My second post"]);
        }, 1000);
    });
}

function getPostCommentsAsync(post) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Great post!", "Nice work!"]);
        }, 1000);
    });
}


// Task 11.3: Promise Chaining

getUserDataAsync(1)
    .then((user) => {
        console.log("User:", user);
        return getUserPostsAsync(user.id);
    })
    .then((posts) => {
        console.log("Posts:", posts);
        return getPostCommentsAsync(posts[0]);
    })
    .then((comments) => {
        console.log("Comments:", comments);
    })
    .catch((error) => {
        console.log("Something went wrong:", error);
    });

// Promise.all: Run three requests together

Promise.all([
    getUserDataAsync(1),
    getUserDataAsync(2),
    getUserDataAsync(3)
])
.then((users) => {
    console.log("All users:", users);
})
.catch((error) => {
    console.log("Error:", error);
});

// Promise.race: First Promise to finish wins

const fastPromise = new Promise((resolve) => {
    setTimeout(() => resolve("Fast Promise won!"), 1000);
});

const slowPromise = new Promise((resolve) => {
    setTimeout(() => resolve("Slow Promise won!"), 3000);
});

Promise.race([fastPromise, slowPromise])
    .then((result) => {
        console.log(result);
    });


// Task 11.4: Async/Await

async function displayUserInformation() {
    try {
        const user = await getUserDataAsync(1);
        console.log("User:", user);

        const posts = await getUserPostsAsync(user.id);
        console.log("Posts:", posts);

        const comments = await getPostCommentsAsync(posts[0]);
        console.log("Comments:", comments);

    } catch (error) {
        console.log("Error:", error);
    }
}

allUsers = users;
populateCityFilter();
displayUsers(allUsers);

function displayUsers(users) {
    usersContainer.innerHTML = "";

    users.forEach((user) => {
        const card = document.createElement("div");

        const name = document.createElement("h2");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = "Email: " + user.email;

        const city = document.createElement("p");
        city.textContent = "City: " + user.address.city;

        card.appendChild(name);
        card.appendChild(email);
        card.appendChild(city);

        usersContainer.appendChild(card);
    });
}


// Parallel requests using async/await

async function getMultipleUsers() {
    try {
        const users = await Promise.all([
            getUserDataAsync(1),
            getUserDataAsync(2),
            getUserDataAsync(3)
        ]);

        console.log("All users loaded:", users);

    } catch (error) {
        console.log("Error loading users:", error);
    }
}
let allUsers = [];

getMultipleUsers();

// Rewrite callback hell using async/await

async function loadCompleteUserData() {
    try {
        const user = await getUserDataAsync(1);
        console.log("User:", user);

        const posts = await getUserPostsAsync(user.id);
        console.log("Posts:", posts);

        const comments = await getPostCommentsAsync(posts[0]);
        console.log("Comments:", comments);

        console.log("All data loaded successfully!");

    } catch (error) {
        console.log("Something went wrong:", error);
    }
}

loadCompleteUserData();


// Search, sort and filter functionality

function applyFilters() {
    const search = document.getElementById("search-input")
        .value.toLowerCase();

    const sort = document.getElementById("sort-select").value;

    const city = document.getElementById("city-filter").value;

    let filteredUsers = allUsers.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search);

        const matchesCity =
            city === "all" || user.address.city === city;

        return matchesSearch && matchesCity;
    });

    filteredUsers.sort((a, b) => {
        return sort === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });

    displayUsers(filteredUsers);
}

function populateCityFilter() {
    const cityFilter = document.getElementById("city-filter");

    const cities = [...new Set(
        allUsers.map((user) => user.address.city)
    )];

    cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
}

function init() {
    document.getElementById("search-input")
        .addEventListener("input", applyFilters);

    document.getElementById("sort-select")
        .addEventListener("change", applyFilters);

    document.getElementById("city-filter")
        .addEventListener("change", applyFilters);
}

init();
                                              
