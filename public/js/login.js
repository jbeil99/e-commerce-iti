import { handleLogin, currentUser } from "./validation/loginValidation.js";

if (sessionStorage.getItem("user")) {
    window.location.href = "/shop.html"
}


window.addEventListener("load", () => {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const form = document.querySelector("#signin");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const valid = await handleLogin(username, password);
        if (valid) {
            const userData = { username: currentUser.username, id: currentUser.id, roles: currentUser.roles }
            sessionStorage.setItem("user", JSON.stringify(userData));
            window.location.href = "/shop.html";
        }
    });
})