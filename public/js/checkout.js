
import { addProductCheckout } from "./helpers/addProduct.js";
import { getCart } from "./api/cart.js";
import { calacPrices } from "./helpers/calcPrices.js";
import { fillCartData } from "./helpers/fillForms.js"
const currentUser = JSON.parse(sessionStorage.getItem("user"));

window.addEventListener("load", async () => {
    const cartTable = document.querySelector("#cart");
    const subtotalSpan = document.querySelector("#subtotol")
    const totalSpan = document.querySelector("#total")
    const discount = document.querySelector("#discount")
    const shipping = document.querySelector("#shipping")
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
})