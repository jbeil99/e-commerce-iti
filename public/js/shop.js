import { addProdcutCard } from "./helpers/addProduct.js";
import { getProdcuts } from "./api/product.js";
import { getCart, addProductToCart, addProdcutToLocalStorageCart } from "./api/cart.js";


// {
//     "userID": 1,
//     "items": [
//       {
//         "productID": 1,
//         "quantity": 2
//       },
//       {
//         "productID": 3,
//         "quantity": 1
//       }
//     ],
//     "id": "8250"
//   }

const currentUser = JSON.parse(sessionStorage.getItem("user"));



window.addEventListener("load", async () => {
    const products = await getProdcuts();
    const productGrid = document.querySelector(".product-grid");
    let cart;
    if (currentUser) {
        console.log(currentUser);
        cart = await getCart(currentUser.cart.id)
    } else {
        localStorage.setItem("cart", JSON.stringify({ items: [] }))
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    console.log(products);
    products.forEach(product => {
        addProdcutCard(productGrid, product)
    });

    productGrid.addEventListener("click", async (e) => {
        if (e.target.nodeName === "BUTTON") {
            if (e.target.classList.contains("cart")) {
                if (currentUser) {
                    await addProductToCart(currentUser.cart.id, e.target.value);
                } else {
                    addProdcutToLocalStorageCart(e.target.value)
                }
            }
        }

        if (e.target.nodeName === "BUTTON") {
            if (e.target.classList.contains("wishlist")) {
                console.log(e.target.value)
            }
        }
    })
})