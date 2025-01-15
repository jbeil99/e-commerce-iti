import { addProdcutCard } from "./helpers/addProduct.js";
import { getProdcuts } from "./api/product.js";
window.addEventListener("load", async () => {
    const products = await getProdcuts();
    const productGrid = document.querySelector(".product-grid");
    products.forEach(product => {
        addProdcutCard(productGrid, product)
    });
})