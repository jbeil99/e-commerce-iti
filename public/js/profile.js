import { handleSave } from "./validation/registerValidation.js";
import { getUser, updateUser, SoftDeleteUser } from "./api/user.js";
import { checkUserAuth, editGuard } from "./guards/userGuard.js";
import { displayMessage } from "./helpers/messageHelper.js";
import { fillUserData } from "./helpers/fillForms.js";



let currentUser = checkUserAuth();


window.addEventListener("load", async () => {
    const username = document.querySelector("#username");
    const fname = document.querySelector("#fname");
    const lname = document.querySelector("#lname");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const password = document.querySelector("#password");
    const conPassword = document.querySelector("#confirm-password");

    const user = await getUser(currentUser.id);
    const form = document.querySelector("#profile-form");

    if (user) {
        fillUserData(username, email, fname, lname, user)
    }
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (e.submitter.value === "delete") {
            await SoftDeleteUser(currentUser.id);
            sessionStorage.removeItem("user");
            return;
        }

        const vaild = handleSave(username, password, fname, lname, email, conPassword, currentUser.username);
        if (vaild) {
            await updateUser(currentUser.id, {
                username: username.value,
                firstName: fname.value,
                lastName: lname.value,
                email: email.value,
                password: password.value.trim() === "" ? user.password : password.value,
            })
        }

    })
})