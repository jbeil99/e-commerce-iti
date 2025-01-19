import { handleSave, handleRegister } from "./validation/registerValidation.js";
import { getUser, deleteUser, updateUser, addUser } from "./api/user.js";
import { addRoleGuard, checkUserAuth, editGuard } from "./guards/userGuard.js";
import { displayMessage } from "./helpers/messageHelper.js";
import { fillUserData } from "./helpers/fillForms.js";
import { addUserCart } from "./api/cart.js";
import { addUserWishlist } from "./api/wishlist.js";

let currentUser = checkUserAuth();
const userID = window.location.search.slice(1,).split("=")[1];
addRoleGuard(['admin', 'manger'], "/public/pages/profile.html")

const getRoleSelected = (select, user) => {
    for (let r of select) {
        if (r.selected) {
            return r.value;
        }
    }
    return user.role;
}



window.addEventListener("load", async () => {
    const form = document.querySelector("#user-details");
    const username = document.querySelector("#username");
    const email = document.querySelector("#email");
    const fname = document.querySelector("#fname");
    const lname = document.querySelector("#lname");
    const select = document.querySelector("#roles");
    const password = document.querySelector("#password");
    const conPassword = document.querySelector("#confirm-password");
    const message = document.querySelector(".message");
    const saveBtn = document.querySelector("#add");

    const user = userID ? await getUser(userID) : null;

    if ((currentUser.role !== "admin" || currentUser.role !== "manger") && currentUser.id === userID) {
        select.parentElement.style.display = "none";
    }

    if (!user && userID) {
        displayMessage(message, `UserID "${userID}" Doesnt match anyuser in the system`, "#FFEB78");
        return false;
    }

    if (currentUser.role === "admin") {
        const option = document.createElement("option");
        option.value = "manger";
        option.innerText = "Manger";
        select.appendChild(option);
    }

    if (user) {
        fillUserData(username, email, fname, lname, user, select, saveBtn)
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (e.submitter.id === "delete") {
            e.preventDefault();
            if (confirm(`Are Your sure You want to delete ${user.username}?`)) {
                const res = await deleteUser(user.id);
                window.location.href = "/public/dashboard/admin.html";
            }

            return false
        }

        if (e.submitter.id === "save") {
            const vaild = await handleSave(username, password, fname, lname, email, conPassword, user.username, user.email)

            if (vaild) {
                const role = getRoleSelected(select, user)

                await updateUser(user.id, {
                    username: username.value,
                    firstName: fname.value,
                    lastName: lname.value,
                    email: email.value,
                    password: password.value.trim() === "" ? user.password : password.value,
                    role: role && currentUser.role === "admin" ? role : user.role
                })
            }
        }

        if (e.submitter.id === "add") {
            const vaild = await handleRegister(username, password, fname, lname, email, conPassword);
            let role;
            for (let r of select) {
                if (r.selected) {
                    role = r.value;
                }
            }
            const body = {
                username: username.value,
                password: password.value,
                firstName: fname.value,
                lastName: lname.value,
                email: email.value,
                role: role ? role : "customer"
            }

            if (role === "seller") {
                body["approved"] = true;
            }

            if (vaild) {
                e.preventDefault();
                const user = await addUser(
                    body
                );
                await addUserCart(user.id);
                await addUserWishlist(user.id)
                window.location.href = "/public/dashboard/admin.html";
            }
        }
    });
})