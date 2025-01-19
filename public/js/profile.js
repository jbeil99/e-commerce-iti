import { handleSave } from "./validation/registerValidation.js";
import { getUser, updateUser, SoftDeleteUser } from "./api/user.js";
import { checkUserAuth, editGuard } from "./guards/userGuard.js";
import { displayMessage } from "./helpers/messageHelper.js";
import { fillUserData } from "./helpers/fillForms.js";
import { getUserOrders } from "./api/order.js";
import { addUserOrderRows } from "./helpers/addRows.js";

let currentUser = checkUserAuth();

const switchSections = (activeSection, ...disabledSections) => {
    activeSection.style.display = "block";
    for (const section of disabledSections) {
        section.style.display = "none";
    }
}

const tab = window.location.search.slice(1,).split("=")[1];

const handleTabs = (tab, ordersSection, profileSection, profileNav, orderNav) => {
    if (!tab || tab === "setting") {
        switchSections(profileSection, ordersSection);
        profileNav.classList.add("active");
        orderNav.classList.remove("active");
    }
    if (tab === "orders") {
        switchSections(ordersSection, profileSection);
        orderNav.classList.add("active");
        profileNav.classList.remove("active");
    }
}

window.addEventListener("load", async () => {
    const username = document.querySelector("#username");
    const fname = document.querySelector("#fname");
    const lname = document.querySelector("#lname");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const conPassword = document.querySelector("#confirm-password");
    const user = await getUser(currentUser.id);
    const form = document.querySelector("#profile-form");
    const logOut = document.querySelector("#logout");
    const orderTable = document.querySelector("#order-table");
    const orders = await getUserOrders(user.id);
    const profileNav = document.querySelector("#profile");
    const orderNav = document.querySelector("#orders-history");
    const profileSection = document.querySelector("#profile-section");
    const orderSection = document.querySelector("#order-section");

    orders.forEach(order => {
        addUserOrderRows(order, orderTable)
    });
    fillUserData(username, email, fname, lname, user)
    handleTabs(tab, orderSection, profileSection, profileNav, orderNav);

    profileNav.addEventListener("click", () => {
        window.location.search = "tab=setting";
    });

    orderNav.addEventListener("click", () => {
        window.location.search = "tab=orders";
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (e.submitter.value === "delete") {
            if (confirm("Are you sure you want to delete the acount ?")) {
                await SoftDeleteUser(currentUser.id);
                sessionStorage.removeItem("user");
            }
            return;
        }

        const vaild = await handleSave(username, password, fname, lname, email, conPassword, user.username, user.email);

        if (vaild) {
            e.preventDefault();
            await updateUser(currentUser.id, {
                username: username.value,
                firstName: fname.value,
                lastName: lname.value,
                email: email.value,
                password: password.value.trim() === "" ? user.password : password.value,
            })
        }

    })

    logOut.addEventListener("click", () => {
        sessionStorage.removeItem("user")
        window.location.href = "/public/pages/login.html"
    })
})