import { toggleApproveSeller, getUsers, SoftDeleteUser } from "./api/user.js";
import { toggleApproveProduct, deleteProduct, getProdcuts, softDeleteProduct } from "./api/product.js"
import { checkUserAuth, addRoleGuard } from "./guards/userGuard.js";
import { addProductRow, addUserRow } from "./helpers/addRows.js";

const user = checkUserAuth();

addRoleGuard(["admin"], "/shop.html");


const switchSections = (activeSection, ...disabledSections) => {
    activeSection.style.display = "block";
    for (const section of disabledSections) {
        section.style.display = "none";
    }
}


window.addEventListener("load", async () => {
    const userNav = document.querySelector("#users-nav");
    const productNav = document.querySelector("#products-nav");
    const usersSection = document.querySelector("#users-section");
    const productsSection = document.querySelector("#products-section");

    const usersTable = document.querySelector("#users tbody");
    const sellersTable = document.querySelector("#sellers tbody");
    const productsTable = document.querySelector("#products tbody");
    const deletedProductsTable = document.querySelector("#deleted-products tbody");

    const approveBtn = document.querySelector("#approve");
    const selectAll = document.querySelector("#all");
    const users = await getUsers();
    const products = await getProdcuts();

    users.forEach(user => {
        if (user.role === "admin") {
            return;
        }
        if (user.role === "seller" || user.approved !== undefined) {
            addUserRow(user, sellersTable, true)
        } else {
            addUserRow(user, usersTable)
        }
    });

    products.forEach(product => {
        if (product.sellerDeleted === true) {
            addProductRow(product, deletedProductsTable, user, false);
        } else {
            addProductRow(product, productsTable, user);
        }
    })

    userNav.addEventListener("click", () => {
        switchSections(usersSection, productsSection);
        userNav.classList.add("active");
        productNav.classList.remove("active");

    })

    productNav.addEventListener("click", () => {
        switchSections(productsSection, usersSection);
        productNav.classList.add("active");
        userNav.classList.remove("active");

    })

    sellersTable.addEventListener("click", (e) => {
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("delete")) {
            SoftDeleteUser(e.target.value);
        }
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("approve")) {
            if (e.target.innerText.toLowerCase() === "approve") {
                toggleApproveSeller(e.target.value, true);
            }
            if (e.target.innerText.toLowerCase() === "disapprove") {
                toggleApproveSeller(e.target.value, false);
            }
        }
    });

    selectAll.addEventListener('change', function () {
        let checkboxes =
            document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = this.checked;
        }, this);
    });

    approveBtn.addEventListener("click", () => {
        let checkboxes =
            document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(async function (checkbox) {
            if (checkbox.checked) {
                if (checkbox.value !== "on") {
                    await approveProduct(checkbox.value);
                }
            }
        }, this);
    })

    productsTable.addEventListener("click", (e) => {
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("delete")) {
            softDeleteProduct(e.target.value);
        }
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("approve")) {
            if (e.target.innerText.toLowerCase() === "approve") {
                toggleApproveProduct(e.target.value, true);
            }
            if (e.target.innerText.toLowerCase() === "disapprove") {
                toggleApproveProduct(e.target.value, false);
            }
        }
    })

    deletedProductsTable.addEventListener("click", (e) => {
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("delete")) {
            deleteProduct(e.target.value);
        }

    })

})