import { addProdcutOrder } from "./helpers/addProduct.js"
import { checkUserAuth, addRoleGuard } from "./guards/userGuard.js";
import { getOrder, cancelOrder } from "./api/order.js";
import { fillOrderHistory } from "./helpers/fillForms.js"


let currentUser = checkUserAuth();
const orderID = window.location.search.slice(1,).split("=")[1];

window.addEventListener("load", async () => {
    const orderTable = document.querySelector("#order-table");
    const order = await getOrder(orderID);
    const title = document.querySelector(".order-header h2");
    const status = document.querySelector(".order-header span");
    const subtotalSpan = document.querySelector("#subtotol")
    const totalSpan = document.querySelector("#total")
    const address = document.querySelector("#addressCard");
    const date = document.querySelector("#date");
    const phone = document.querySelector("#phone");
    const cancelBtn = document.querySelector("#updateBtn");

    if (order.orderCanceld || order.status === "deliverd") {
        cancelBtn.disabled = true;
        cancelBtn.style.backgroundColor = "gray";
    }
    cancelBtn.addEventListener("click", async (e) => {

        const alert = await Swal.fire({
            title: 'Are You sure You want to cancel the order',
            icon: 'question',
            confirmButtonText: 'ok',
            showCancelButton: true,
        });
        if (alert.isConfirmed) {
            await cancelOrder(orderID);
            window.location.href = "/public/pages/profile.html?tab=orders"
        }
    })
    fillOrderHistory(subtotalSpan, totalSpan, status, title, address, phone, date, order);
    order.items.forEach(item => {
        addProdcutOrder(orderTable, item, order);
    })

})