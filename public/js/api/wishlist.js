"use strict";


const getWishlist = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/wishlists/${id}`);
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

const getUserWishlist = async (userID) => {
    try {
        const response = await fetch("http://localhost:3000/wishlists");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const wishlists = await response.json()
        return wishlists.filter(wishlist => userID === wishlist.userID)[0];
    } catch (e) {
        console.log(e);
    }
    return null;
}

const addUserWishlist = async (userID) => {
    const body = {
        userID: userID,
        items: [],
    };
    try {
        const response = await fetch("http://localhost:3000/wishlists", {
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



const deleteWishlistProduct = async (wishlistID, productID) => {
    const wishlist = await getWishlist(wishlistID);
    const body = {
        userID: wishlist.userID,
        items: wishlist.items.filter(item => item.productID !== productID)
    };

    try {
        const response = await fetch(`http://localhost:3000/wishlists/${wishlistID}`, {
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

const emptyWishlist = async (id) => {
    const body = {
        items: []
    };
    try {
        const response = await fetch(`http://localhost:3000/wishlists/${id}`, {
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



const checkProduct = (items, productID) => {
    for (let item of items) {
        if (item.productID === productID) {
            return true;
        }
    }
}

const addProductToWishlist = async (wishlistID, productID, quantity = 1) => {
    const wishlist = await getWishlist(wishlistID);
    const items = wishlist.items;
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
        const response = await fetch(`http://localhost:3000/wishlists/${wishlistID}`, {
            method: "PUT",
            body: JSON.stringify({
                userID: wishlist.userID,
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



export { addProductToWishlist, addUserWishlist, deleteWishlistProduct, getUserWishlist, getWishlist, checkProduct, emptyWishlist };