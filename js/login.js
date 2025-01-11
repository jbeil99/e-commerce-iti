"use strict";

const switchSingUp = (signIn, signUp, formIn, formUp) => {
    signUp.classList.add("active");
    signIn.classList.remove("active");
    formIn.style.display = "none";
    formUp.style.display = "block";
}

const switchSingIn = (signIn, signUp, formIn, formUp) => {
    signIn.classList.add("active");
    signUp.classList.remove("active");
    formIn.style.display = "block";
    formUp.style.display = "none";
}

const validatePassword = (e) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
    const error = e.target.parentElement.querySelector("p");

    const errorMsg = {
        upper: "Password Must Contain atleast 1 Captial letter",
        num: "Password Must Contain atleast 1 number",
        less: "Password Must be atleast 8 characters"
    }
    if (e.target.value.match(regex)) {
        error.style.display = "none"
        error.innerText = "";
        return true;
    }
    if (e.target.value.trim() !== "") {
        e.target.focus()
    }

    if (e.target.value === e.target.value.toLowerCase()) {
        error.innerText = errorMsg.upper;
    }
    if (!e.target.value.match(/\d/g)) {
        error.innerText = errorMsg.num;
    }

    if (e.target.value.length < 8) {
        error.innerText = errorMsg.less;
    }
    error.style.display = "block";

    return false;
}

const validateConfirmPassword = (e, password) => {
    const error = e.target.parentElement.querySelector("p");
    const errorMsg = "Passwords Doesnt Match";
    if (e.target.value === password.value) {
        error.style.display = "none"
        error.innerText = "";
        return true
    }

    if (password.value.trim() === "") {
        password.focus();
    } else if (e.target.value.trim() !== "") {
        e.target.focus()
    }

    error.style.display = "block";
    error.innerText = errorMsg;
    return false;
}

const validateName = (e, field = "name", n = 2,) => {
    const error = e.target.parentElement.querySelector("p");
    const regex = new RegExp(`[a-zA-z]{${n},}`, 'g');
    const errorMsg = {
        less: `${field} Cant be less than ${n} letters`,
        num: "You cant Enter Numbers as a name"
    }

    if (e.target.value.trim().match(regex)) {
        error.style.display = "none"
        error.innerText = "";
        return true;
    }

    // TODO: Fix bug in firefox
    if (e.target.value.trim() !== "") {
        e.target.focus()
    }
    error.style.display = "block";
    error.innerText = errorMsg.less;
    if (!isNaN(Number(e.target.value))) {
        error.innerText = errorMsg.num;
    }

    return false;
}

const validateEmail = (e) => {
    const error = e.target.parentElement.querySelector("p");
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const errorMsg = "Enter a Vaild Email address";

    if (e.target.value.trim().match(regex)) {
        return true;
    }
    // TODO: Fix bug in firefox
    if (e.target.value.trim() !== "") {
        e.target.focus()
    }
    error.innerText = errorMsg;
    error.style.display = "block";

    return false;
}

const getUsers = async () => {
    const json = await fetch("/db.json").then(r => r.json());
    const users = await json["users"];
    return users
}
const valdaiteUsername = async (e) => {
    const error = e.target.parentElement.querySelector("p");
    const regex = /[a-zA-z]{3,}/g;
    let exists = false;
    const users = await getUsers()
    users.forEach(user => {
        if (e.target.value === user.username) {
            console.log("name is in db")
            exists = true;
        }
    });
    if (!exists) {
        return validateName(e, "username", 3)
    }
    error.innerText = "Username Already Exists";
    error.style.display = "block";
    e.target.focus()
    return false
}

window.addEventListener("load", () => {
    const signIn = document.querySelector(".tabs div:nth-child(1)");
    const signUp = document.querySelector(".tabs div:nth-child(2)");
    const tabs = document.querySelector(".tabs");
    const formUp = document.querySelector("#signup")
    const formIn = document.querySelector("#signin")
    const firstName = document.querySelector("#fname");
    const lastName = document.querySelector("#lname");
    const password = document.querySelector("#password-up");
    const conPassword = document.querySelector("#confirm-password");
    const email = document.querySelector("#email-up")
    const username = document.querySelector("#username-up");

    tabs.addEventListener("click", (e) => {
        if (
            e.target === signIn.querySelector("p") ||
            e.target === signIn
        ) {
            switchSingIn(signIn, signUp, formIn, formUp)
        }

        if (
            e.target === signUp.querySelector("p") ||
            e.target === signUp
        ) {
            switchSingUp(signIn, signUp, formIn, formUp)
        }
    })


    lastName.addEventListener("blur", validateName)
    firstName.addEventListener("blur", validateName)

    password.addEventListener("blur", validatePassword)
    conPassword.addEventListener("blur", (e) => {
        validateConfirmPassword(e, password)
    })

    email.addEventListener('blur', validateEmail);
    username.addEventListener("blur", async (e) => {
        await valdaiteUsername(e)
    })
});