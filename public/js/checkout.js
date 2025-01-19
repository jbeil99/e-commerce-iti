import { addProductCheckout } from "./helpers/addProduct.js";
import { getCart, emptyCart } from "./api/cart.js";
import { calacPrices } from "./helpers/calcPrices.js";
import { fillCartData } from "./helpers/fillForms.js"
import { handleCheckout } from "./validation/checkoutValidation.js";
import { addOrder } from "./api/order.js";
import { checkUserAuth } from "./guards/userGuard.js"
import { updateProdcutQuantity } from "./api/product.js";

const currentUser = checkUserAuth();

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
    const { total, subtotal } = await calacPrices(cart.items);
    fillCartData(subtotalSpan, totalSpan, discount, shipping, { total, subtotal });

    if (cart.items.length > 0) {
        cart.items.forEach(item => {
            addProductCheckout(cartTable, item);
        })
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const vaild = handleCheckout(fname, lname, zipcode, phone);
        if (vaild) {
            e.preventDefault();
            const alert = await Swal.fire({
                title: 'Order Placed!',
                text: 'Thanks For purchasing our pokemons',
                icon: 'success',
                confirmButtonText: 'OK',
                footer: '<a href="/public/pages/profile.html">Track the order</a>'
            });

            await addOrder({
                userID: currentUser.id,
                totalPrice: total,
                status: "placed",
                items: cart.items,
                address: {
                    1: address1.value,
                    2: address2.value
                },
                phone: phone.value,
                firstName: fname.value,
                lastName: lname.value,
                zipcode: zipcode.value,
                date: new Date()
            });
            cart.items.forEach(async (item) => {
                const test = await updateProdcutQuantity(item.productID, item.quantity);
                console.log(test)
            });
            await emptyCart(cart.id);

            window.location.href = "/public/pages/profile.html?tab=orders";
        }
    })
})