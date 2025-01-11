import { valdaiteUsername, validateConfirmPassword, validateName, validateEmail, validatePassword } from "./validation/registerValidation.js";

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