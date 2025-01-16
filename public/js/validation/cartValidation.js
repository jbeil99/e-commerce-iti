
import { getProduct } from "../api/product.js";
import { displayMessage } from "../helpers/messageHelper.js"

const quantityValidation = async (quantity) => {
    const product = await getProduct(quantity.id);
    const message = document.querySelector(".message");
    if (quantity.value > product.quantity) {
        quantity.value = product.quantity;
        displayMessage(message, `${product.name}" only have ${product.quantity} Left`, "#FFEB78");
        return false
    }
    if (quantity.value <= 0) {
        displayMessage(message, "You cant add 0 items", "#FFEB78");
        quantity.value = 1;
        quantity.foucs();
        return false
    }
    return true
}


export { quantityValidation };