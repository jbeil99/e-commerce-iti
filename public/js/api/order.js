"use strict";

const getOrders = async () => {
    try {
        const response = await fetch("http://localhost:3000/orders");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const orders = await response.json()

        return orders;
    } catch (e) {
        console.log(e);
    }
    return null;
}

const getUserOrders = async (userID) => {
    try {
        const response = await fetch("http://localhost:3000/orders");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const orders = await response.json()

        return orders.filter(product => userID === product.userID && product.sellerDeleted !== true);;
    } catch (e) {
        console.log(e);
    }
    return null;
}

const getOrder = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/orders/${id}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const order = await response.json()

        return order;
    } catch (e) {
        console.log(e);
    }
    return null;
}

const addOrder = async (body) => {
    try {
        const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            body: JSON.stringify(body),
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

const updateOrder = async (id, body) => {
    try {
        const response = await fetch(`http://localhost:3000/orders/${id}`, {
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


const softDeleteOrder = async (id, value = true) => {
    try {
        const response = await fetch(`http://localhost:3000/orders/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                orderDeleted: value
            })
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
const cancelOrder = async (id, value = true) => {
    try {
        const response = await fetch(`http://localhost:3000/orders/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                orderCanceld: value
            })
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

export { getOrder, getOrders, getUserOrders, addOrder, softDeleteOrder, updateOrder, cancelOrder };