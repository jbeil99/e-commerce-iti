import { calacPrices } from "./calcPrices.js";

const fillUserData = (username, email, fname, lname, user, select, saveBtn) => {
    username.value = user.username;
    email.value = user.email;
    fname.value = user.firstName;
    lname.value = user.lastName;
    if (select) {
        saveBtn.innerText = "Save";
        saveBtn.id = "save";
        for (let r of select) {
            if (r.value === user.role) {
                r.selected = true;
            }
        }
    }
}

const fillCartData = (subtotalSpan, totalSpan, discount, shipping, prices) => {
    subtotalSpan.innerText = `$${prices.subtotal}`;
    totalSpan.innerText = `$${prices.total}`;

}

const fillOrderData = (price, phone, zipcode, fname, lname, address, address2, order, select) => {
    price.value = order.totalPrice;
    phone.value = order.phone;
    zipcode.value = order.zipcode
    fname.value = order.firstName;
    lname.value = order.lastName;
    address.value = order.address["1"];
    address2.value = order.address["2"];
    for (let status of select) {
        if (status.value === order.status) {
            status.selected = true;
        }
    }
}
const fillOrderHistory = async (subtotalSpan, totalSpan, status, title, address, phone, date, order) => {
    fillCartData(subtotalSpan, totalSpan, "", "", await calacPrices(order.items))
    title.innerText = `#${order.id}`
    status.innerText = order.status;
    status.classList.add("pending")
    const orderDate = new Date(order.date);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    address.innerText = order.address["1"];
    phone.innerText = order.phone;
    date.innerText = orderDate.toLocaleDateString(undefined, options);
    if (order.status === "deliverd") {
        status.innerText = "completed";
        status.classList.remove("pending")
        status.classList.add("completed")
    } else if (order.orderCanceld) {
        status.innerText = "cancelled";
        status.classList.remove("pending")
        status.classList.add("cancelled")
    }
}

export { fillUserData, fillCartData, fillOrderData, fillOrderHistory }