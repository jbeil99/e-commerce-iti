import { validateName } from "./registerValidation.js";
import { getProdcuts } from "../api/product.js";

const validateProductName = async (target, seller, skip = "") => {
    const error = target.parentElement.querySelector("p");
    const products = await getProdcuts();
    let exists = false;
    products.forEach(product => {
        if (product.name === skip) {
            return
        }
        if (product.name.trim() === target.value.trim() && product.seller_id === seller.id) {
            exists = true;
        }
    });
    if (!exists) {
        return validateName(target, "product name", 2);
    }
    error.innerText = "product Already Exists";
    error.style.display = "block";
    target.focus()
    return false
}

const validatePrice = (price, custPrice = Number(price.value) * 1.2) => {
    const error = price.parentElement.querySelector("p");
    const errorMsg = {
        empty: "price cant be empty",
        less: "price cant be less than 1",
        custLow: "customer price cant be less than or equal price"
    }

    if (!price.value) {
        error.innerText = errorMsg.empty;
        error.style.display = "block";
        price.focus()
        return false
    }
    if (price.value <= 0) {
        error.innerText = errorMsg.less;
        error.style.display = "block";
        price.focus()
        return false
    }
    if (custPrice <= Number(price.value)) {
        error.innerText = errorMsg.custLow;
        error.style.display = "block";
        price.focus()
        return false
    }
    return true;
}

const validateQuantity = (target) => {
    const error = price.parentElement.querySelector("p");
    const errorMsg = {
        empty: "price cant be empty",
        less: "price cant be less than 1",
    }
    if (target.value <= 0) {
        error.innerText = errorMsg.less;
        error.style.display = "block";
        target.focus()
        return false
    }
    if (!target.value) {
        error.innerText = errorMsg.empty;
        error.style.display = "block";
        target.focus()
        return false
    }
    return true
}

const validateImage = (target) => {
    const error = target.parentElement.querySelector("p");
    const errorMsg = "Please upload an image (PNG or JPEG).";
    if (target.value.trim() === "") {
        error.innerText = errorMsg;
        error.style.display = "block";
        return false
    }
    return true;
}

const validateDescription = (target) => {
    const error = target.parentElement.querySelector("p");
    const errorMsg = "description must be atleast 20 characters";
    if (description.value.trim().length < 20) {
        error.innerText = errorMsg;
        error.style.display = "block";
        return false
    }
    return true;
}

const validateDiscount = (target) => {
    const error = target.parentElement.querySelector("p");
    const errorMsg = "discount cant be more than 100%";

    if (target.value > 100) {
        error.innerText = errorMsg;
        error.style.display = "block";
        return false
    }
    return true;
}

const handleProduct = async (name, price, custPrice, quantity, discount, image, description, seller, skip = "") => {
    return validateDescription(description) &&
        validateImage(image) &&
        validatePrice(price) &&
        validatePrice(price, custPrice.value) &&
        validateQuantity(quantity) &&
        await validateProductName(name, seller, skip) &&
        validateDiscount(discount);
}



export { validateDescription, validateImage, validatePrice, validateQuantity, validateProductName, handleProduct }
