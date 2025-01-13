import { getUsers } from "./api/user.js";
import { checkUserAuth, addRoleGuard } from "./guards/userGuard.js";

const user = checkUserAuth();

addRoleGuard(["admin"], "/shop.html");



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
    role.innerText = data.role;

    table.appendChild(tr);
}

const switchSections = (activeSection, ...disabledSections) => {
    activeSection.style.display = "block";
    for (const section of disabledSections) {
        section.style.display = "none";
    }
}


window.addEventListener("load", async () => {
    const userNav = document.querySelector("#users-nav");
    const productNav = document.querySelector("#products-nav");
    const usersSection = document.querySelector("#users-section");
    const productsSection = document.querySelector("#products-section");

    const usersTable = document.querySelector("#users tbody");
    const sellersTable = document.querySelector("#sellers tbody");
    const productsTable = document.querySelector("#products tbody");
    const users = await getUsers();

    users.forEach(user => {
        if (user.role === "admin") {
            return;
        }
        if (user.role === "seller") {
            addUserRow(user, sellersTable)
        } else {
            addUserRow(user, usersTable)
        }
    });

    userNav.addEventListener("click", () => {
        switchSections(usersSection, productsSection);
        userNav.classList.add("active");
        productNav.classList.remove("active");

    })

    productNav.addEventListener("click", () => {
        switchSections(productsSection, usersSection);
        productNav.classList.add("active");
        userNav.classList.remove("active");

    })

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