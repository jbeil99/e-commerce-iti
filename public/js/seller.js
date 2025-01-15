import { softDeleteProduct, getSellerProdcuts } from "./api/product.js"
import { checkUserAuth, addRoleGuard } from "./guards/userGuard.js";
import { displayNothingFound } from "./helpers/messageHelper.js";
import { addProductRow } from "./helpers/addRows.js";
const user = checkUserAuth();

addRoleGuard(["seller"], "/shop.html");




window.addEventListener("load", async () => {
    const productsTable = document.querySelector("#products tbody");

    const products = await getSellerProdcuts(user.id);
    console.log(products);
    if (products.length === 0) {
        displayNothingFound(productsTable, "products")
    }

    products.forEach(product => {
        addProductRow(product, productsTable);
    })

    document.querySelectorAll("input[type='radio']").forEach(c => {
        c.addEventListener("change", function (e) {
            if (this.checked) {
                productsTable.innerHTML = "";
                if (this.value === "all") {
                    products.forEach(product => {
                        addProductRow(product, productsTable);
                    })
                }
                if (this.value === "true") {
                    products.forEach(product => {
                        if (product.approved) {
                            addProductRow(product, productsTable);
                        }
                    })
                }
                if (this.value === "false") {
                    products.forEach(product => {
                        if (!product.approved) {
                            addProductRow(product, productsTable);
                        }
                    })
                }
            }
        })
    })

    productsTable.addEventListener("click", (e) => {
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("delete")) {
            softDeleteProduct(e.target.value);
        }
    })
})