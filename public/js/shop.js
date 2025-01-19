import { addProdcutCard } from "./helpers/addProduct.js";
import { getProdcuts } from "./api/product.js";
import { getCart, addProductToCart, addProdcutToLocalStorageCart } from "./api/cart.js";
import { addProductToWishlist } from "./api/wishlist.js";

const currentUser = JSON.parse(sessionStorage.getItem("user"));


window.addEventListener("load", async () => {
    const products = await getProdcuts();
    const productGrid = document.querySelector(".product-grid");
    const search = document.querySelector("#search");
    const categoryFilters = document.querySelectorAll("input[name='category']");
    const priceFilters = document.querySelectorAll("input[name='price']");
    let numOfResults = products.length;

    let cart;
    if (currentUser) {
        cart = await getCart(currentUser.cart.id)
    } else {
        localStorage.setItem("cart", JSON.stringify({ items: [] }))
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    products.forEach(product => {
        if (product.approved && !product.sellerDeleted) {
            addProdcutCard(productGrid, product)
        }
    });

    categoryFilters.forEach(filter => {
        filter.addEventListener("input", (e) => {

            productGrid.innerHTML = "";
            if (e.target.value === "0") {
                products.forEach(product => {
                    if (product.approved && !product.sellerDeleted && price) {
                        addProdcutCard(productGrid, product)
                    }
                });
            }

            products.forEach(product => {
                if (product.approved && !product.sellerDeleted && product.category === e.target.value && price) {
                    addProdcutCard(productGrid, product)
                }
            });
        })
    })

    priceFilters.forEach(filter => {
        filter.addEventListener("input", (e) => {
            const categoryChecked = document.querySelector("input[name='category']:checked");

            productGrid.innerHTML = "";
            if (e.target.value === "0") {
                products.forEach(product => {
                    if (product.approved && !product.sellerDeleted) {
                        addProdcutCard(productGrid, product)
                    }
                });
            }
            else if (e.target.id === "under") {
                products.forEach(product => {
                    const category = categoryChecked.value === "0" ? true : categoryChecked.value === product.category;
                    if (product.approved && !product.sellerDeleted && product.customerPrice <= Number(e.target.value) && category) {
                        addProdcutCard(productGrid, product)
                    }
                });
            }
            else if (e.target.id === "above") {
                products.forEach(product => {
                    const category = categoryChecked.value === "0" ? true : categoryChecked.value === product.category;
                    if (product.approved && !product.sellerDeleted && product.customerPrice >= Number(e.target.value) && category) {
                        addProdcutCard(productGrid, product)
                    }
                });
            }
            else if (e.target.id === "range") {
                products.forEach(product => {
                    const category = categoryChecked.value === "0" ? true : categoryChecked.value === product.category;
                    if (product.approved && !product.sellerDeleted && product.customerPrice >= Number(e.target.value.split("-")[0]) && product.customerPrice <= Number(e.target.value.split("-")[1]) && category) {
                        addProdcutCard(productGrid, product)
                    }
                });
            }
        })
    })

    productGrid.addEventListener("click", async (e) => {
        if (e.target.nodeName === "BUTTON") {
            if (e.target.classList.contains("cart")) {
                if (currentUser) {
                    await addProductToCart(currentUser.cart.id, e.target.value);
                } else {
                    addProdcutToLocalStorageCart(e.target.value)
                }
            }
            if (e.target.classList.contains("wishlist")) {
                if (currentUser) {
                    await addProductToWishlist(currentUser.wish.id, e.target.value);
                } else {
                    window.location.href = "/public/pages/login.html"
                }
            }
        }


    });

    search.addEventListener("input", (e) => {
        productGrid.innerHTML = "";
        products.forEach(product => {
            if (product.approved && !product.sellerDeleted && product.name.trim().match(new RegExp(e.target.value, "i"))) {
                addProdcutCard(productGrid, product)
            }
        });
    })
})