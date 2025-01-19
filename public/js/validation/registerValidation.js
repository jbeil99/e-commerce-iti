import { getUsers } from "/public/js/api/user.js";

const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
    const error = password.parentElement.querySelector("p");

    const errorMsg = {
        upper: "Password Must Contain atleast 1 Captial letter",
        num: "Password Must Contain atleast 1 number",
        less: "Password Must be atleast 8 characters"
    }

    if (password.value.match(regex)) {
        error.style.display = "none"
        error.innerText = "";
        return true;
    }

    if (password.value.trim() !== "") {
        password.focus()
    }

    if (password.value === password.value.toLowerCase()) {
        error.innerText = errorMsg.upper;
    }
    if (!password.value.match(/\d/g)) {
        error.innerText = errorMsg.num;
    }

    if (password.value.length < 8) {
        error.innerText = errorMsg.less;
    }
    error.style.display = "block";

    return false;
}

const validateConfirmPassword = (confirm, password) => {
    const error = confirm.parentElement.querySelector("p");
    const errorMsg = "Passwords Doesnt Match";

    if (confirm.value === password.value && confirm.value.trim() !== "") {
        error.style.display = "none"
        error.innerText = "";
        return true
    }

    if (password.value.trim() === "") {
        password.focus();
    }
    error.style.display = "block";
    error.innerText = errorMsg;
    return false;
}

const validateName = (target, field = "name", n = 2,) => {
    const error = target.parentElement.querySelector("p");
    const regex = new RegExp(`[a-zA-z]{${n},}`, 'g');
    const errorMsg = {
        less: `${field} Cant be less than ${n} letters`,
        num: "You cant Enter Numbers as a name"
    }

    if (target.value.trim().match(regex)) {
        error.style.display = "none"
        error.innerText = "";
        return true;
    }

    // TODO: Fix bug in firefox
    if (target.value.trim() !== "") {
        target.focus()
    }
    error.style.display = "block";
    error.innerText = errorMsg.less;
    if (!isNaN(Number(target.value))) {
        error.innerText = errorMsg.num;
    }

    return false;
}

const validateEmail = async (email, skip) => {
    const error = email.parentElement.querySelector("p");
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const errorMsg = "Enter a Vaild Email address";
    const users = await getUsers()
    let exists = false;

    users.forEach(user => {
        if (user.email === skip) {
            return
        }

        if (email.value === user.email) {
            exists = true;
        }
    });
    if (exists) {
        error.style.display = "block"
        error.innerText = "Email is Already used";
        return false;
    }

    if (email.value.trim().match(regex)) {
        error.style.display = "none"
        error.innerText = "";
        return true;
    }

    // TODO: Fix bug in firefox
    if (email.value.trim() !== "") {
        email.focus()
    }
    error.innerText = errorMsg;
    error.style.display = "block";

    return false;
}



const valdaiteUsername = async (username, skip = "") => {
    const error = username.parentElement.querySelector("p");

    let exists = false;
    const users = await getUsers()
    users.forEach(user => {
        if (user.username === skip) {
            return
        }
        if (username.value === user.username) {
            exists = true;
        }
    });
    if (!exists) {
        return validateName(username, "username", 3)
    }
    error.innerText = "Username Already Exists";
    error.style.display = "block";
    username.focus()
    return false
}


const handleRegister = async (username, password, firstName, lastName, email, conPassword) => {
    const exists = await valdaiteUsername(username);
    return exists &&
        validatePassword(password) &&
        await validateEmail(email) &&
        validateConfirmPassword(conPassword, password) &&
        validateName(firstName) &&
        validateName(lastName)
}

const handleSave = async (username, password, firstName, lastName, email, conPassword, skip, skipEmail) => {
    const exists = await valdaiteUsername(username, skip);
    if (password.value.trim() === "" && conPassword.value.trim() === "") {
        return exists &&
            await validateEmail(email, skipEmail) &&
            validateName(firstName) &&
            validateName(lastName)
    }

    return exists &&
        validatePassword(password) &&
        await validateEmail(email, skipEmail) &&
        validateConfirmPassword(conPassword, password) &&
        validateName(firstName) &&
        validateName(lastName)
}

export { valdaiteUsername, validateConfirmPassword, validateEmail, validateName, validatePassword, handleRegister, handleSave };