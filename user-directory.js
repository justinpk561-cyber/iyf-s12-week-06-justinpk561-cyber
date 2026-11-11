
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
