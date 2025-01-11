import { valdaiteUsername, validateConfirmPassword, validateName, validateEmail, validatePassword, handleRegister } from "./validation/registerValidation.js";
import { addUser } from "./api/user.js"

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
    const form = document.querySelector("#signup");


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


    lastName.addEventListener("blur", (e) => {
        validateName(e.target)
    })
    firstName.addEventListener("blur", (e) => {
        validateName(e.target)
    })

    password.addEventListener("blur", (e) => {
        validatePassword(e.target)
    })
    conPassword.addEventListener("blur", (e) => {
        validateConfirmPassword(e.target, password)
    })

    email.addEventListener('blur', (e) => {
        validateEmail(e.target)
    });
    username.addEventListener("blur", async (e) => {
        await valdaiteUsername(e.target)
    })

    form.addEventListener("submit", (e) => {
        console.log(handleRegister(username, password, firstName, lastName, email, conPassword))

        if (!handleRegister(username, password, firstName, lastName, email, conPassword)) {
            e.preventDefault();
            return false;
        }
        addUser(
            {
                username: username.value,
                password: password.value,
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
            }
        );
        e.preventDefault();
        return false;
    })
});