import { softDeleteProduct, getSellerProdcuts, getProdcuts } from "./api/product.js"
import { checkUserAuth, addRoleGuard } from "./guards/userGuard.js";
import { displayNothingFound } from "./helpers/messageHelper.js";
import { addProductRow, addOrdersRow } from "./helpers/addRows.js";
import { getOrders } from "./api/order.js";
import { getProduct } from "./api/product.js";
const user = checkUserAuth();

addRoleGuard(["seller"], "/index.html");
const tab = window.location.search.slice(1,).split("=")[1];
console.log(tab);
const switchSections = (activeSection, ...disabledSections) => {
    activeSection.style.display = "block";
    for (const section of disabledSections) {
        section.style.display = "none";
    }
}

const handleTabs = (tab, productsSection, ordersSection, productNav, orderNav) => {
    if (tab === "products" || !tab) {
        switchSections(productsSection, ordersSection);
        productNav.classList.add("active");
        orderNav.classList.remove("active");
    }
    if (tab === "orders") {
        switchSections(ordersSection, productsSection);
        orderNav.classList.add("active");
        productNav.classList.remove("active");
    }
}

window.addEventListener("load", async () => {
    const productsTable = document.querySelector("#products tbody");
    const productNav = document.querySelector("#products-nav");
    const orderNav = document.querySelector("#orders-nav");
    const productsSection = document.querySelector("#products-section");
    const ordersSection = document.querySelector("#orders-section");
    const products = await getSellerProdcuts(user.id);
    const ordersTable = document.querySelector("#orders tbody");
    const orders = await getOrders();

    if (products.length === 0) {
        displayNothingFound(productsTable, "products")
    }
    handleTabs(tab, productsSection, ordersSection, productNav, orderNav);

    products.forEach(product => {
        addProductRow(product, productsTable, false);
    })

    orders.forEach(async (order) => {
        let vaild = false;
        for (const item of order.items) {
            const product = await getProduct(item.productID);
            if (product.seller_id === user.id) {
                vaild = true;
                break;
            }
        }

        if (!order.orderDeleted && vaild) {
            addOrdersRow(order, ordersTable, true);
        }

    })
    productNav.addEventListener("click", () => {
        window.location.search = "tab=products";
    });

    orderNav.addEventListener("click", () => {
        window.location.search = "tab=orders";
    });

    document.querySelector("select").addEventListener("change", (e) => {
        productsTable.innerHTML = "";
        if (e.target.value === "all") {
            products.forEach(product => {
                addProductRow(product, productsTable, false);
            })
        }
        if (e.target.value) {
            products.forEach(product => {
                if (String(product.approved) === e.target.value) {
                    addProductRow(product, productsTable, false);
                }
            })
        }

    })

    productsTable.addEventListener("click", (e) => {
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("delete")) {
            softDeleteProduct(e.target.value);
        }
    });
})