import { getUsers } from "./api/user.js";


const user = JSON.parse(sessionStorage.getItem("user"))
if (!user) {
    window.location.href = "/public/pages/login.html"
}

if (user) {
    if (!user.roles.includes("admin")) {
        window.location.href = "/shop.html"
    }
}


const addUserRow = (data, table) => {
    const tr = document.createElement("tr");
    const id = document.createElement("td");
    const username = document.createElement("td");
    const fullname = document.createElement("td");
    const email = document.createElement("td");
    const role = document.createElement("td");

    tr.appendChild(id);
    id.innerText = data.id;
    tr.appendChild(username)
    username.innerText = data.username;
    tr.appendChild(fullname);
    fullname.innerText = `${data.firstName} ${data.lastName}`;
    tr.appendChild(email);
    email.innerText = data.email;
    tr.appendChild(role);
    role.innerText = data.roles.join(",");

    table.appendChild(tr);
}



window.addEventListener("load", async () => {
    const usersTable = document.querySelector("#users tbody");
    const sellersTable = document.querySelector("#sellers tbody");
    const productsTable = document.querySelector("#products tbody");
    const users = await getUsers();

    users.forEach(user => {
        if (user.roles.includes("admin")) {
            return;
        }
        if (user.roles.includes("seller")) {
            addUserRow(user, sellersTable)
        } else {
            addUserRow(user, usersTable)
        }
    });

    usersTable.addEventListener("click", (e) => {
        const userID = e.target.parentElement.querySelector("td:nth-child(1)").innerText;
        if (userID) {
            window.location.href = `/public/admin/user-details.html?id=${userID}`;
        }
    })

    sellersTable.addEventListener("click", (e) => {
        const sellerID = e.target.parentElement.querySelector("td:nth-child(1)").innerText;
        if (sellerID) {
            window.location.href = `/public/admin/user-details.html?id=${sellerID}`;
        }
    })

    productsTable.addEventListener("click", (e) => {
        const productID = e.target.parentElement.querySelector("td:nth-child(1)").innerText;
        if (productID) {
            window.location.href = `/public/admin/product-details.html?id=${productID}`;
        }

    })
})