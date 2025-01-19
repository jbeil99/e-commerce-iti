import { addProductWishlist } from "./helpers/addProduct.js";
import { displayMessage } from "./helpers/messageHelper.js";
import { addProductToCart } from "./api/cart.js"
import { getWishlist, deleteWishlistProduct } from "./api/wishlist.js"

const currentUser = JSON.parse(sessionStorage.getItem("user"));

window.addEventListener("load", async () => {
    const wishTable = document.querySelector("#wish-table");
    const form = document.querySelector("#wish-form");

    let wish;
    if (currentUser) {
        wish = await getWishlist(currentUser.wish.id)
    }

    if (wish.items.length > 0) {
        wish.items.forEach(item => {
            addProductWishlist(wishTable, item);
        })
    }


    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (e.submitter.id === "removeBtn") {
            await deleteWishlistProduct(currentUser.wish.id, e.submitter.value)
        }
        if (e.submitter.id === "add") {
            await addProductToCart(currentUser.cart.id, e.submitter.value);
            await deleteWishlistProduct(currentUser.wish.id, e.submitter.value)
        }

        e.preventDefault();
        return false;
    })
})