import { handleLogin, currentUser } from "./validation/loginValidation.js";
import { getUserCart } from "./api/cart.js";
import { getUserWishlist } from "./api/wishlist.js";

if (sessionStorage.getItem("user")) {
    window.location.href = "/index.html"
}


window.addEventListener("load", () => {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const form = document.querySelector("#signin");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const valid = await handleLogin(username, password);
        if (valid) {
            const cart = await getUserCart(currentUser.id);
            const wish = await getUserWishlist(currentUser.id);

            const userData = { username: currentUser.username, id: currentUser.id, role: currentUser.role, cart, wish }
            sessionStorage.setItem("user", JSON.stringify(userData));
            window.location.href = "/index.html";
        }
    });
})