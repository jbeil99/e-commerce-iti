import { handleSave, handleRegister } from "./validation/registerValidation.js";
import { getUser } from "./api/user.js";
import { addProduct, getProdcuts, updateProduct, deleteProduct, getProduct } from "./api/product.js";
import { checkUserAuth, editGuard } from "./guards/userGuard.js";
import { displayMessage } from "./helpers/messageHelper.js";


// let currentUser = checkUserAuth();
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
    const category = document.querySelector("#category");
    const description = document.querySelector("#description");
    const quantity = document.querySelector("#quantity");

    const message = document.querySelector(".message");
    const saveBtn = document.querySelector("#add");
    const product = await getProduct(productID)
    console.log(product);

    editGuard(product.seller_id)

    // if (!canEditRole) {
    //     select.parentElement.style.display = "none";
    // }

    if (!product && productID) {
        displayMessage(message, `productID "${productID}" Doesnt match any Product in the system`, "#FFEB78");
        return false;
    }

    console.log(product)

    fillData(name, price, customerPrice, image, category, description, quantity, saveBtn, product)


    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (e.submitter.id === "delete") {
            e.preventDefault();
            if (confirm(`Are Your sure You want to delete ${product.name}?`)) {
                const res = await deleteProduct(user.id);
                window.location.href = "/public/admin/admin.html";
            }

            return false
        }

        if (e.submitter.id === "save") {
            const vaild = await handleSave(username, password, fname, lname, email, conPassword, user.username)

            if (vaild) {
                const role = getRoleSelected(select, user)
                console.log(role);

                await updateProduct(product.id, {
                    name: name.value,
                    description: description.value,
                    price: price.value,
                    customerPrice: customerPrice.value, // check for admin
                    quantity: quantity.value,
                    category: category ?? 1,
                    approved: false // check for admin
                })
            }
        }

        if (e.submitter.id === "add") {
            const vaild = await handleRegister(username, password, fname, lname, email, conPassword);
            let category;
            for (let c of category) {
                if (c.category) {
                    category = c.value;
                }
            }
            // {
            //     "id": 1,
            //     "name": "Product 1",
            //     "description": "Product 1 Description",
            //     "price": 200,
            //     "unit": "Piece",
            //     "image": "product image url",
            //     "availability": false,
            //     "quantity": 0,
            //     "category": "skin care",
            //     "rating": 0,
            //     "seller_id": 2,
            //     "reviews": [
            //       {
            //         "user_id": 1,
            //         "rating": 5,
            //         "comment": "comment"
            //       }
            //     ]
            //   }

            if (vaild) {
                e.preventDefault();
                await addProduct(
                    {
                        name: name.value,
                        description: description.value,
                        price: price.value,
                        customerPrice: unit.value,
                        quantity: quantity.value,
                        category: category ?? 1,
                        rating: 0,
                        seller_id: 1,// cahnge
                        reviews: [],
                        approved: false // check for admin
                    }
                );
                window.location.href = "/public/admin/admin.html";
            }
        }
    });
})