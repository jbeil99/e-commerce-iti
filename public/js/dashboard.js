import { toggleApproveSeller, getUsers, SoftDeleteUser, deleteUser, updateUser } from "./api/user.js";
import { toggleApproveProduct, deleteProduct, getProdcuts, softDeleteProduct } from "./api/product.js"
import { checkUserAuth, addRoleGuard } from "./guards/userGuard.js";
import { addOrdersRow, addProductRow, addUserRow } from "./helpers/addRows.js";
import { getOrders, softDeleteOrder } from "./api/order.js"


const currentUser = checkUserAuth();
const tab = window.location.search.slice(1,).split("=")[1];



const switchSections = (activeSection, ...disabledSections) => {
    activeSection.style.display = "block";
    for (const section of disabledSections) {
        section.style.display = "none";
    }
}

const handleTabs = (tab, usersSection, productsSection, ordersSection, userNav, productNav, orderNav) => {
    if (!tab || tab === "users") {
        switchSections(usersSection, productsSection, ordersSection);
        userNav.classList.add("active");
        productNav.classList.remove("active");
        orderNav.classList.remove("active");
    }
    if (tab === "products") {
        switchSections(productsSection, usersSection, ordersSection);
        productNav.classList.add("active");
        userNav.classList.remove("active");
        orderNav.classList.remove("active");
    }
    if (tab === "orders") {
        switchSections(ordersSection, usersSection, productsSection);
        orderNav.classList.add("active");
        userNav.classList.remove("active");
        productNav.classList.remove("active");
    }
}


addRoleGuard(["admin", "manger"], "/index.html");





window.addEventListener("load", async () => {
    const userNav = document.querySelector("#users-nav");
    const productNav = document.querySelector("#products-nav");
    const orderNav = document.querySelector("#orders-nav");
    const usersSection = document.querySelector("#users-section");
    const productsSection = document.querySelector("#products-section");
    const ordersSection = document.querySelector("#orders-section");

    const usersTable = document.querySelector("#users tbody");
    const sellersTable = document.querySelector("#sellers tbody");
    const deletedUsers = document.querySelector("#deleted-users tbody");
    const productsTable = document.querySelector("#products tbody");
    const ordersTable = document.querySelector("#orders tbody");

    const deletedProductsTable = document.querySelector("#deleted-products tbody");
    const deletedOrdersTable = document.querySelector("#deleted-orders tbody");

    const approveBtn = document.querySelector("#approve");
    const selectAll = document.querySelector("#all");
    const users = await getUsers();
    const products = await getProdcuts();
    const orders = await getOrders();


    users.forEach(user => {
        if (user.role === "admin" || user.role === currentUser.role) {
            return;
        }
        if (user.userDeleted) {
            addUserRow(user, deletedUsers);
        }
        else if (user.role === "seller" || user.approved !== undefined) {
            addUserRow(user, sellersTable, true)
        } else {
            addUserRow(user, usersTable)
        }
    });

    products.forEach(product => {
        if (product.sellerDeleted === true) {
            addProductRow(product, deletedProductsTable, false);
        } else {
            addProductRow(product, productsTable);
        }
    })

    orders.forEach(order => {
        if (order.orderDeleted) {
            addOrdersRow(order, deletedOrdersTable);

        } else {
            addOrdersRow(order, ordersTable);

        }

    })

    handleTabs(tab, usersSection, productsSection, ordersSection, userNav, productNav, orderNav)

    userNav.addEventListener("click", () => {
        window.location.search = "tab=users";

    });

    productNav.addEventListener("click", () => {
        window.location.search = "tab=products";
    });

    orderNav.addEventListener("click", () => {
        window.location.search = "tab=orders";
    });

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

    usersTable.addEventListener("click", (e) => {
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("delete")) {
            SoftDeleteUser(e.target.value);
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
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(async (checkbox) => {
            if (checkbox.checked) {
                if (checkbox.value !== "on") {
                    await toggleApproveProduct(checkbox.value, true);
                }
            }
        });
        window.location.search = "tab=products";
    })


    productsTable.addEventListener("click", async (e) => {
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("delete")) {
            await softDeleteProduct(e.target.value);
            window.location.search = "tab=products";

        }
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("approve")) {
            if (e.target.innerText.toLowerCase() === "approve") {
                await toggleApproveProduct(e.target.value, true);
            }
            if (e.target.innerText.toLowerCase() === "disapprove") {
                await toggleApproveProduct(e.target.value, false);
            }
            window.location.search = "tab=products";
        }
    })

    deletedProductsTable.addEventListener("click", async (e) => {
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("delete")) {
            await deleteProduct(e.target.value);
            window.location.search = "tab=products";
        }

        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("restore")) {
            await softDeleteProduct(e.target.value, false);
            window.location.search = "tab=products";
        }
    })

    deletedUsers.addEventListener("click", async (e) => {
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("delete")) {
            await deleteUser(e.target.value);
        }

        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("restore")) {
            await updateUser(e.target.value, { userDeleted: false })
        }

    })

    ordersTable.addEventListener("click", async (e) => {
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("delete")) {
            await softDeleteOrder(e.target.value);
            window.location.search = "tab=orders";
        }
    })

    deletedOrdersTable.addEventListener("click", async (e) => {
        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("delete")) {
        }

        if (e.target.nodeName === "BUTTON" && e.target.classList.contains("restore")) {
            await softDeleteOrder(e.target.value, false);
            window.location.search = "tab=orders";
        }
    })

})