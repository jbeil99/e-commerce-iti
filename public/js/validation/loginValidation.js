import { getUsers } from "/public/js/api/user.js";

let currentUser = null;

const checkUsername = (username, users) => {
    const error = document.querySelector("#login-error");

    let exists = false;
    users.forEach(user => {
        if (username.value.trim() === user.username && user.userDeleted !== true) {
            currentUser = user;
            exists = true;
            return;
        }
    });

    if (exists) {
        error.style.display = "none"
        error.innerText = "";
        return true
    }
    error.innerText = "Incorrect Username or Password";
    error.style.display = "block";
    return false;
}

const checkPassword = (password, user) => {
    const error = document.querySelector("#login-error");

    if (user.password === password.value) {
        error.style.display = "none"
        error.innerText = "";
        return true;
    }
    error.innerText = "Incorrect Username or Password";
    error.style.display = "block";
    currentUser = null;
    return false;
}

const handleLogin = async (username, password) => {
    const users = await getUsers();
    let valid = checkUsername(username, users);
    if (valid) {
        valid = checkPassword(password, currentUser);
    }

    return valid
}
export { handleLogin, currentUser };