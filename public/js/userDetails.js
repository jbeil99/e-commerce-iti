import { handleSave, handleRegister } from "./validation/registerValidation.js";
import { getUser, deleteUser, updateUser, addUser } from "./api/user.js";
import { checkUserAuth, editGuard } from "./guards/userGuard.js";
import { displayMessage } from "./helpers/messageHelper.js";



let currentUser = checkUserAuth();
const userID = window.location.search.slice(1,).split("=")[1];
const canEditRole = editGuard(userID);

const getRoleSelected = (select, user) => {
    for (let r of select) {
        if (r.selected) {
            return r.value;
        }
    }
    return user.role;
}


// `UserID "${userID}" Doesnt match anyuser in the system`
const fillData = (username, email, fname, lname, select, saveBtn, user) => {
    if (user) {
        saveBtn.innerText = "Save";
        saveBtn.id = "save";
        username.value = user.username;
        email.value = user.email;
        fname.value = user.firstName;
        lname.value = user.lastName;
        for (let r of select) {
            if (r.value === user.role) {
                r.selected = true;
            }
        }
    }
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

    if (!canEditRole) {
        select.parentElement.style.display = "none";
    }

    if (!user && userID) {
        displayMessage(message, `UserID "${userID}" Doesnt match anyuser in the system`, "#FFEB78");
        return false;
    }


    fillData(username, email, fname, lname, select, saveBtn, user)


    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (e.submitter.id === "delete") {
            e.preventDefault();
            if (confirm(`Are Your sure You want to delete ${user.username}?`)) {
                const res = await deleteUser(user.id);
                window.location.href = "/public/admin/admin.html";
            }
            // TODO: SEE HOW can you fire and event to handle on the other page ????!!
            // window.onload = () => {
            //     console.log("hi");
            //     message.innerText = `User ${res.username} Was Successfully Deleted`;
            //     message.style.display = "block";
            //     setTimeout(() => { message.style.display = "none" }, 5000)
            // }
            return false
        }

        if (e.submitter.id === "save") {
            const vaild = await handleSave(username, password, fname, lname, email, conPassword, user.username)

            if (vaild) {
                const role = getRoleSelected(select, user)
                console.log(role);

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

            if (vaild) {
                e.preventDefault();
                await addUser(
                    {
                        username: username.value,
                        password: password.value,
                        firstName: fname.value,
                        lastName: lname.value,
                        email: email.value,
                        role: role ?? "customer"
                    }
                );
                window.location.href = "/public/admin/admin.html";
            }
        }
    });
})