import { handleCheckout } from "./validation/checkoutValidation.js";
import { getOrder, softDeleteOrder, updateOrder } from "./api/order.js";
import { addRoleGuard, checkUserAuth } from "./guards/userGuard.js";
import { displayMessage } from "./helpers/messageHelper.js";
import { fillOrderData } from "./helpers/fillForms.js";
import { addProductCheckout } from "./helpers/addProduct.js";


let currentUser = checkUserAuth();
const orderID = window.location.search.slice(1,).split("=")[1];
addRoleGuard(['admin', 'manger', "seller"], "/public/pages/profile.html")

const getStatusSelected = (select, order) => {
    for (let r of select) {
        if (r.selected) {
            return r.value;
        }
    }
    return order.status;
}



window.addEventListener("load", async () => {
    const form = document.querySelector("#order-details");
    const price = document.querySelector("#price");
    const phone = document.querySelector("#phone");
    const zipcode = document.querySelector("#zipcode");
    const fname = document.querySelector("#fname");
    const lname = document.querySelector("#lname");
    const address = document.querySelector("#address");
    const address2 = document.querySelector("#address2");
    const select = document.querySelector("#status");
    const message = document.querySelector(".message");
    const productsDiv = document.querySelector(".products");

    const order = orderID ? await getOrder(orderID) : null;
    if (order) {
        for (const product of order.items) {
            await addProductCheckout(productsDiv, product)
        }
    }

    if (currentUser.role === "seller") {
        phone.readOnly = true;
        price.readOnly = true;
        zipcode.readOnly = true;
        lname.readOnly = true;
        fname.readOnly = true;
        address.readOnly = true;
        address2.readOnly = true;

    }

    if (!order && orderID) {
        displayMessage(message, `OORDERID "${orderID}" Doesnt match any order in the system`, "#FFEB78");
        return false;
    }

    if (order) {
        fillOrderData(price, phone, zipcode, fname, lname, address, address2, order, select)
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (e.submitter.id === "delete") {
            e.preventDefault();
            if (confirm(`Are Your sure You want to delete ${order.id}?`)) {
                const res = await softDeleteOrder(order.id);
                window.location.href = "/public/dashboard/admin.html?tab=orders";
            }
            return false
        }

        if (e.submitter.id === "save") {
            const vaild = handleCheckout(fname, lname, zipcode, phone)

            if (vaild) {
                const status = getStatusSelected(select, order)

                await updateOrder(order.id, {
                    ...order,
                    firstName: fname.value,
                    lastName: lname.value,
                    phone: phone.value,
                    zipcode: zipcode.value,
                    address: {
                        1: address.value,
                        2: address2.value
                    },
                    status: status ? status : order.status
                })
            }
        }
    });
})