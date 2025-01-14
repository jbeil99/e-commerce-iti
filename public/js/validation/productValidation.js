import { validateName } from "./registerValidation";
import { getProdcuts } from "../api/product";

const validateProductName = async (target, seller) => {
    const error = target.parentElement.querySelector("p");
    const products = await getProdcuts();
    let exists = false;
    products.forEach(product => {
        if (product.name.trim() === target.value.trim() && product.seller_id === seller.id) {
            exists = true;
        }
    });
    if (!exists) {
        return validateName(target, "product name", 6);
    }
    error.innerText = "product Already Exists";
    error.style.display = "block";
    target.focus()
    return false
}

const validatePrice = (price, custPrice = price * 1.2) => {
    const error = price.parentElement.querySelector("p");

    const errorMsg = {
        empty: "price cant be empty",
        less: "price cant be less than 1",
        custLow: "customer price cant be less than or equal price"
    }

    if (!price.value) {
        error.innerText = errorMsg.empty;
        error.style.display = "block";
        target.focus()
        return false
    }
    if (price.value <= 0) {
        error.innerText = errorMsg.less;
        error.style.display = "block";
        target.focus()
        return false
    }
    if (custPrice <= price) {
        error.innerText = errorMsg.custLow;
        error.style.display = "block";
        target.focus()
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
}

// Select the form element
const form = document.getElementById('product-details');

// Add event listener for form submission
form.addEventListener('submit', (event) => {
    // Prevent the default form submission
    event.preventDefault();

    // Clear all previous error messages
    document.querySelectorAll('.error').forEach((errorElement) => {
        errorElement.textContent = '';
    });

    // Validate inputs
    let isValid = true;

    // Validate Product Name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        isValid = false;
        name.nextElementSibling.textContent = 'Product Name is required.';
    }

    // Validate Price
    const price = document.getElementById('price');
    if (!price.value || price.value <= 0) {
        isValid = false;
        price.nextElementSibling.textContent = 'Price must be a positive number.';
    }

    // Validate Customer Price
    const customerPrice = document.getElementById('customerPrice');
    if (!customerPrice.value || customerPrice.value <= 0) {
        isValid = false;
        customerPrice.nextElementSibling.textContent = 'Customer Price must be a positive number.';
    }

    // Validate Quantity
    const quantity = document.getElementById('quantity');
    if (!quantity.value || quantity.value <= 0) {
        isValid = false;
        quantity.nextElementSibling.textContent = 'Quantity must be a positive number.';
    }

    // Validate Image
    const image = document.getElementById('image');
    if (!image.files.length) {
        isValid = false;
        image.nextElementSibling.textContent = 'Please upload an image (PNG or JPEG).';
    }

    // Validate Category
    const category = document.getElementById('category');
    if (!category.value) {
        isValid = false;
        category.nextElementSibling.textContent = 'Please select a category.';
    }

    // Validate Description
    const description = document.getElementById('description');
    if (!description.value.trim()) {
        isValid = false;
        description.nextElementSibling.textContent = 'Description is required.';
    }

    // If the form is valid, proceed
    if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
    } else {
        alert('Please fix the errors in the form.');
    }
});
