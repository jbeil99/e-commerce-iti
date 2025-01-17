

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

export { fillUserData, fillCartData, fillOrderData }