import { getUser } from "../api/user.js";

const manageProductStatus = (data) => {
    // TODO: Cahnge after adddmin all to productss
    if (data.sellerDeleted === true) {
        return "Seller Deleted"
    }
    return data.approved ? "Approved" : "Not Approved";
}
// TODO: Consider Classes HERE
const addProductRow = async (data, table, addCheck = true) => {
    const seller = await getUser(data.seller_id);
    const tr = document.createElement("tr");

    const id = document.createElement("td");
    const productName = document.createElement("td");
    const sellerName = document.createElement("td");
    const image = document.createElement("td");
    const category = document.createElement("td");
    const rating = document.createElement("td");
    const price = document.createElement("td");
    const quantity = document.createElement("td");
    const status = document.createElement("td");
    const edit = document.createElement("td");
    const editBtn = document.createElement("button");
    const editUrl = document.createElement("a");
    const deleteTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    const approve = document.createElement("td");
    const approveBtn = document.createElement("button");
    if (addCheck) {
        const checkbox = document.createElement("td");
        tr.appendChild(checkbox);
        checkbox.innerHTML = `<input type="checkbox" value=${data.id}>`;
        checkbox.value = data.id;
    }
    tr.appendChild(id);
    id.innerText = data.id;
    tr.appendChild(productName)
    productName.innerText = data.name;
    tr.appendChild(price);
    price.innerText = data.price;
    tr.appendChild(quantity);
    quantity.innerText = data.quantity;
    tr.appendChild(sellerName);
    if (!seller) {
        console.log(data)
    }
    sellerName.innerText = `${seller.firstName} ${seller.lastName}`;
    tr.appendChild(image);
    image.innerHTML = `<img src="${data.image}" alt="${data.name}" />`;
    tr.appendChild(category);
    category.innerText = data.category;
    tr.appendChild(rating);
    rating.innerText = data.rating;
    tr.appendChild(status);
    status.innerText = manageProductStatus(data);
    tr.appendChild(edit);
    edit.appendChild(editUrl);
    editUrl.appendChild(editBtn);
    editUrl.href = `/public/admin/product-details.html?id=${data.id}`
    editBtn.classList.add("btn");
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    tr.appendChild(deleteTd);
    deleteTd.appendChild(deleteBtn);

    if (data.sellerDeleted) {
        deleteBtn.classList.add("btn", "restore");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can-arrow-up"></i>';
    } else {
        deleteBtn.classList.add("btn", "delete");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    }

    deleteBtn.value = data.id;

    if (addCheck) {
        tr.appendChild(approve);
        approve.appendChild(approveBtn);
        approveBtn.classList.add("btn", "approve");
        approveBtn.innerText = data.approved ? "disapprove" : "approve";
        approveBtn.value = data.id;
    }
    table.appendChild(tr);

}

const addUserRow = (data, table, seller = false) => {
    const tr = document.createElement("tr");
    const id = document.createElement("td");
    const username = document.createElement("td");
    const fullname = document.createElement("td");
    const email = document.createElement("td");
    const role = document.createElement("td");
    const edit = document.createElement("td");
    const editBtn = document.createElement("button");
    const editUrl = document.createElement("a");
    const status = document.createElement("td");
    const deleteTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    const approve = document.createElement("td");
    const approveBtn = document.createElement("button");
    tr.appendChild(id);
    id.innerText = data.id;
    tr.appendChild(username)
    username.innerText = data.username;
    tr.appendChild(fullname);
    fullname.innerText = `${data.firstName} ${data.lastName}`;
    tr.appendChild(email);
    email.innerText = data.email;
    tr.appendChild(role);
    role.innerText = data.role;
    if (data.role === "seller" || data.approved !== undefined) {
        tr.appendChild(status);
        status.innerText = data.approved ? "Aprroved" : "Waiting Approval";
    }
    tr.appendChild(edit);
    edit.appendChild(editUrl);
    editUrl.appendChild(editBtn);
    editUrl.href = `/public/admin/order-details.html?id=${data.id}`
    editBtn.classList.add("btn");
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    tr.appendChild(deleteTd);
    deleteTd.appendChild(deleteBtn);
    if (data.userDeleted) {
        deleteBtn.classList.add("btn", "restore");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can-arrow-up"></i>';
    } else {
        deleteBtn.classList.add("btn", "delete");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    }

    deleteBtn.value = data.id;
    if (seller) {
        tr.appendChild(approve);
        approve.appendChild(approveBtn);
        approveBtn.classList.add("btn", "approve");
        approveBtn.innerText = data.approved ? "disapprove" : "approve";
        approveBtn.value = data.id;
    }

    table.appendChild(tr);
}

const addOrdersRow = async (data, table) => {
    const tr = document.createElement("tr");
    const id = document.createElement("td");
    const price = document.createElement("td");
    const name = document.createElement("td");
    const num = document.createElement("td");
    const status = document.createElement("td");
    const edit = document.createElement("td");
    const editBtn = document.createElement("button");
    const editUrl = document.createElement("a");
    const deleteTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    id.innerText = data.id;
    price.innerText = data.totalPrice;
    name.innerText = `${data.firstName} ${data.lastName}`;
    num.innerText = data.items.length;
    status.innerText = data.status;
    edit.appendChild(editUrl);
    editUrl.appendChild(editBtn);
    editUrl.href = `/public/admin/user-details.html?id=${data.id}`
    editBtn.classList.add("btn");
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.classList.add("btn", "delete");
    deleteTd.appendChild(deleteBtn);
    tr.append(id, price, name, num, status, edit, deleteTd);
    table.appendChild(tr)
}

export { addProductRow, addUserRow, addOrdersRow }