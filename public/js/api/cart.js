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
        return carts.filter(cart => userID === cart.userID)[0];
    } catch (e) {
        console.log(e);
    }
    return null;
}

const addUserCart = async (userID) => {
    const body = {
        userID: userID,
        items: [],
    };
    try {
        const response = await fetch("http://localhost:3000/carts", {
            method: "POST",
            body: JSON.stringify(body),
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



const deleteCartProduct = async (cartID, productID) => {
    const cart = await getCart(cartID);
    const body = {
        userID: cart.userID,
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

const emptyCart = async (id) => {
    const body = {
        items: []
    };
    try {
        const response = await fetch(`http://localhost:3000/carts/${id}`, {
            method: "PATCH",
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

// const handleCart = async (currentUser) => {

//     localStorage.setItem("cart", JSON.stringify({ items: [] }))
// }

const checkProduct = (items, productID) => {
    for (let item of items) {
        if (item.productID === productID) {
            return true;
        }
    }
}

const addProductToCart = async (cartID, productID, quantity = 1) => {
    const cart = await getCart(cartID);
    const items = cart.items;
    if (checkProduct(items, productID)) {
        items.forEach(item => {
            if (item.productID === productID) {
                item.quantity = Number(item.quantity) + quantity;
            }
        })
    } else {
        items.push({
            productID,
            quantity
        })
    }

    try {
        const response = await fetch(`http://localhost:3000/carts/${cartID}`, {
            method: "PUT",
            body: JSON.stringify({
                userID: cart.userID,
                items
            }),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e)
    }
}
const addProdcutToLocalStorageCart = (productID, quantity = 1) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const items = cart.items;
    if (checkProduct(items, productID)) {
        items.forEach(item => {
            if (item.productID === productID) {
                item.quantity += quantity;
            }
        })
    } else {
        items.push({
            productID,
            quantity
        })
    }
    localStorage.setItem("cart", JSON.stringify({
        items
    }))
}

const updateCartItemsQuantity = async (cartID, productID, quantity = 1, userID) => {
    const cart = await getCart(cartID);
    const newItems = cart.items.map(item => {
        if (item.productID === productID) {
            item.quantity = quantity;
        }
        return item;
    });
    console.log(newItems[0], quantity)
    const body = {
        userID,
        items: cart.items.map(item => {
            if (item.productID === productID) {
                item.quantity = quantity;
            }
            return item;
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

export { updateCartItemsQuantity, addProductToCart, addProdcutToLocalStorageCart, addUserCart, deleteCartProduct, getUserCart, getCart, checkProduct, emptyCart };