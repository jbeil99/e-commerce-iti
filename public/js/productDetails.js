import { addProduct, updateProduct, deleteProduct, getProduct, getCategories, softDeleteProduct } from "./api/product.js";
import { addRoleGuard, checkUserAuth } from "./guards/userGuard.js";
import { editGuard, addProductGuard } from "./guards/productGuard.js";
import { displayMessage } from "./helpers/messageHelper.js";
import { handleProduct } from "./validation/productValidation.js";


let currentUser = checkUserAuth();
addRoleGuard(['admin', 'seller', 'manger'], "/index.html");

const productID = window.location.search.slice(1,).split("=")[1];



const fillData = (name, price, customerPrice, image, category, description, quantity, saveBtn, product) => {
    if (product) {
        saveBtn.innerText = "Save";
        saveBtn.id = "save";
        name.value = product.name;
        price.value = product.price;
        customerPrice.value = product.customerPrice;
        description.value = product.description;
        quantity.value = product.quantity;
        image.value = product.image;
        for (let c of category) {
            if (c.value === product.category) {
                c.selected = true;
            }
        }
    }
}

window.addEventListener("load", async () => {

    const form = document.querySelector("#product-details");
    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const customerPrice = document.querySelector("#customerPrice");
    const image = document.querySelector("#image");
    const categoriesInput = document.querySelector("#category");
    const description = document.querySelector("#description");
    const quantity = document.querySelector("#quantity");
    const discount = document.querySelector("#discount");

    const message = document.querySelector(".message");
    const saveBtn = document.querySelector("#add");
    const product = productID ? await getProduct(productID) : null;
    const catergories = await getCategories();

    for (const cat of catergories) {
        const option = document.createElement("option");
        option.value = cat.id;
        option.innerText = cat.name;
        categoriesInput.appendChild(option)
    }

    if (product) {
        editGuard(product.seller_id);
    } else {
        addProductGuard()
    }


    if (!product && productID) {
        displayMessage(message, `productID "${productID}" Doesnt match any Product in the system`, "#FFEB78");
        return false;
    }


    fillData(name, price, customerPrice, image, category, description, quantity, saveBtn, product)


    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (e.submitter.id === "delete") {
            e.preventDefault();
            if (confirm(`Are Your sure You want to delete ${product.name}?`)) {
                const res = await softDeleteProduct(product.id);
                window.location.href = "/public/dashboard/admin.html?tab=products";
            }

            return false
        }

        if (e.submitter.id === "save") {
            const vaild = await handleProduct(name, price, customerPrice, quantity, discount, image, description, currentUser, product.name);
            if (vaild) {
                let category;
                for (let c of categoriesInput) {
                    if (c.selected) {
                        category = c.value;
                    }
                }
                await updateProduct(product.id, {
                    ...product,
                    name: name.value,
                    description: description.value,
                    price: price.value,
                    customerPrice: customerPrice.value, // check for admin
                    quantity: quantity.value,
                    category: category,
                    image: image.value,
                    sale: Number(discount.value),
                })
            }
        }

        if (e.submitter.id === "add") {

            const vaild = await handleProduct(name, price, customerPrice, quantity, discount, image, description, currentUser);
            let category;
            for (let c of categoriesInput) {
                if (c.selected) {
                    category = c.value;
                }
            }

            if (vaild) {
                e.preventDefault();
                await addProduct(
                    {
                        name: name.value,
                        description: description.value,
                        price: Number(price.value),
                        customerPrice: Number(customerPrice.value),
                        quantity: Number(quantity.value),
                        category: category,
                        image: image.value,
                        rating: 0,
                        seller_id: currentUser.id,
                        reviews: [],
                        approved: currentUser.role === "admin" ? true : false,
                        sold: 0,
                        sale: Number(discount.value),
                        createdAt: new Date()
                    }
                );
                window.location.href = "/public/dashboard/admin.html?tab=products";
            }
        }
    });
})