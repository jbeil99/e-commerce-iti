import { getCart } from "./api/cart.js";

const addNav = (name, href) => {
    const navUl = document.querySelector("nav ul");
    const dashboard = document.createElement("li");
    const link = document.createElement("a");
    link.innerText = name;
    link.href = href;
    dashboard.appendChild(link);
    navUl.appendChild(dashboard);
}

const addLogout = (profile, currentUser) => {
    profile.href = `/public/pages/profile.html`;
    profile.innerHTML = `<p id="welcome">Welcome,${currentUser.username}</p>
        <i class="fa-solid fa-right-from-bracket"></i>`;

    addNav("Profile", "/public/pages/profile.html")
    addNav("WishList", "/public/pages/wishlist.html")
    if (currentUser.role === "admin" || currentUser.role === "manger") {
        addNav("Dashboard", "/public/dashboard/admin.html")
    }
    if (currentUser.role === "seller") {
        addNav("Dashboard", "/public/dashboard/seller.html")
    }
}
const addCartNum = async (target, id) => {
    const cart = await getCart(id);
    const span = document.createElement("span");
    span.id = "cart-num";
    span.innerText = cart.items.length;
    if (cart.items.length > 0) {
        target.appendChild(span)
    }
}


// TODO: update session after  user update

window.addEventListener("load", () => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const profile = document.querySelector(".profile a:nth-child(2)");
    const cart = document.querySelector(".profile a:nth-child(1)");
    if (currentUser) {
        addLogout(profile, currentUser);
        addCartNum(cart, currentUser.cart.id)

        // TODO: add message
        profile.addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.nodeName === "I") {
                sessionStorage.removeItem("user");
                window.location.href = "/public/pages/login.html";
            }
            if (e.target.nodeName === "P") {
                window.location.href = "/public/pages/profile.html";
            }

        })
    }
})