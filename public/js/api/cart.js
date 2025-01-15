"use strict";


const getCart = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/carts/${id}`);
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

const getUserCart = async (userID) => {
    try {
        const response = await fetch("http://localhost:3000/carts");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const carts = await response.json()

        return carts.filter(cart => userID === product.userID)[0];
    } catch (e) {
        console.log(e);
    }
    return null;
}




const deleteCartProduct = async (cartID, productID) => {
    const cart = await getCart(cartID);
    const body = {
        items: cart.items.filter(item => item.productID !== productID)
    };

    try {
        const response = await fetch(`http://localhost:3000/carts/${cartID}`, {
            method: "PUT",
            body: JSON.stringify(body)
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

const addCart = async (body) => {
    try {
        const response = await fetch("http://localhost:3000/carts", {
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

const addProductToCart = async (cartID, productID, quantity = 1) => {
    const cart = await getCart(cartID);
    const body = {
        items: [...cart.items, { productID: productID, quantity: quantity }]
    };
    try {
        const response = await fetch(`http://localhost:3000/carts/${cartID}`, {
            method: "PUT",
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

const updateCartItemsQuantity = async (cartID, productID, quantity = 1) => {
    const cart = await getCart(cartID);
    const body = {
        items: cart.items.forEach(item => {
            if (item.productID === productID) {
                item.quantity = quantity;
            }
        })
    };
    try {
        const response = await fetch(`http://localhost:3000/carts/${cartID}`, {
            method: "PUT",
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