import { addProductCheckout } from "./helpers/addProduct.js";
import { getCart } from "./api/cart.js";
import { calacPrices } from "./helpers/calcPrices.js";
import { fillCartData } from "./helpers/fillForms.js"
import { handleCheckout } from "./validation/checkoutValidation.js";

const currentUser = JSON.parse(sessionStorage.getItem("user"));

window.addEventListener("load", async () => {
    const cartTable = document.querySelector("#cart");
    const subtotalSpan = document.querySelector("#subtotol")
    const totalSpan = document.querySelector("#total")
    const discount = document.querySelector("#discount")
    const shipping = document.querySelector("#shipping")
    const fname = document.querySelector("#fname");
    const lname = document.querySelector("#lname");
    const address1 = document.querySelector("#address");
    const address2 = document.querySelector("#address2");
    const zipcode = document.querySelector("#zip-code");
    const phone = document.querySelector("#phone")
    const form = document.querySelector("#billing-form");

    let cart;
    if (currentUser) {
        cart = await getCart(currentUser.cart.id)
    } else {
        localStorage.setItem("cart", JSON.stringify({ items: [] }))
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    fillCartData(subtotalSpan, totalSpan, discount, shipping, await calacPrices(cart.items));

    if (cart.items.length > 0) {
        cart.items.forEach(item => {
            addProductCheckout(cartTable, item);
        })
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const vaild = handleCheckout(fname, lname, zipcode, phone);
        if (vaild) {
            console.log("valid");
        }
    })
})