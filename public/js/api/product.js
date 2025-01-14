"use strict";

const getProdcuts = async () => {
    try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const products = await response.json()

        return products;
    } catch (e) {
        console.log(e);
    }
    return null;
}

const getProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const product = await response.json()

        return product;
    } catch (e) {
        console.log(e);
    }
    return null;
}

const addProduct = async (body) => {
    try {
        const response = await fetch("http://localhost:3000/products", {
            method: "POST",
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (e) {
        console.log(e)
    }
}

const updateProduct = async (id, body) => {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
    } catch (e) {
        console.log(e)
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json
    } catch (e) {
        console.log(e)
    }
}
const getCategories = async () => {
    try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json
    } catch (e) {
        console.log(e)
    }
}

export { getProdcuts, getProduct, addProduct, updateProduct, deleteProduct, getCategories };