import { addProdcutCart } from "./helpers/addProduct.js";
import { deleteCartProduct, getCart, updateCartItemsQuantity } from "./api/cart.js";
import { calacPrices } from "./helpers/calcPrices.js";
import { fillCartData } from "./helpers/fillForms.js";
import { quantityValidation } from "./validation/cartValidation.js";
import { displayMessage } from "./helpers/messageHelper.js";

const currentUser = JSON.parse(sessionStorage.getItem("user"));

window.addEventListener("load", async () => {
    const cartTable = document.querySelector("#cart-table");
    const subtotalSpan = document.querySelector("#subtotol")
    const totalSpan = document.querySelector("#total")
    const discount = document.querySelector("#discount")
    const shipping = document.querySelector("#shipping")
    const form = document.querySelector("#cart-form");
    const message = document.querySelector(".message");

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
            addProdcutCart(cartTable, item);
        })
    }
    form.addEventListener("click", (e) => {
        const input = e.target.parentElement.querySelector("input")
        if (e.target.id === "minusBtn") {
            input.value -= 1;
            if (input.value <= 0) {
                input.value = 1;
            }
        }
        if (e.target.id === "plusBtn") {
            input.value = Number(input.value) + 1;
        }
    })
    form.addEventListener("submit", async (e) => {
        const inputs = e.target.querySelectorAll("input");
        e.preventDefault();
        if (e.submitter.id === "removeBtn") {
            await deleteCartProduct(currentUser.cart.id, e.submitter.value)
        }
        if (e.submitter.id === "updateBtn") {
            for (const input of inputs) {
                const vaild = await quantityValidation(input);
                if (vaild) {
                    await updateCartItemsQuantity(currentUser.cart.id, input.id, Number(input.value), currentUser.id);
                } else {
                    e.preventDefault();
                    return false;
                }
            }
        }
        if (e.submitter.id === "checkOut") {
            if (cart.items.length > 0) {
                window.location.href = "/public/pages/checkout.html";
                return;
            }
            displayMessage(message, "Cart is Empty add Products First", "#FFEB78");
        }
        e.preventDefault();
        return false;
    })
})