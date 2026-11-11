
// Task 12.2: Display API Data in DOM

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const usersContainer = document.getElementById("users-container");

async function loadUsers() {
    loading.classList.remove("hidden");
    error.classList.add("hidden");

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Could not load users");
        }

        const users = await response.json();

        displayUsers(users);

    } catch (err) {
        error.textContent = err.message;
        error.classList.remove("hidden");

    } finally {
        loading.classList.add("hidden");
    }
}

function displayUsers(users) {
    usersContainer.innerHTML = "";

    users.forEach((user) => {
        const card = document.createElement("div");

        card.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>City: ${user.address.city}</p>
        `;

        usersContainer.appendChild(card);
    });
}

loadUsers();

// Task 12.3: POST Requests

async function createPost(title, body, userId) {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: userId
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create post");
        }

        return await response.json();

    } catch (error) {
        console.log("Error:", error.message);
        throw error;
    }
}

// Handle form submission

const postForm = document.getElementById("post-form");
const postResult = document.getElementById("post-result");

postForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("post-title").value;
    const body = document.getElementById("post-body").value;

    try {
        const newPost = await createPost(title, body, 1);

        postResult.textContent =
            "Post created successfully! ID: " + newPost.id;

        postForm.reset();

    } catch (error) {
        postResult.textContent = "Could not create post.";
    }
});
