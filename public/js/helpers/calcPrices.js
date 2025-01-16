import { getProduct } from "../api/product.js";

const calacPrices = async (items, shipping = 0, discount = 0) => {
    let total, subtotal = 0;
    const promises = items.map(async (item) => {
        const product = await getProduct(item.productID);
        const productTotal = Number(calcProductTotalPriceAfterDiscount(product, item.quantity));
        subtotal += productTotal;
    });
    await Promise.all(promises);

    total = subtotal - shipping - (subtotal * discount / 100);
    return { total, subtotal }

}

const calcProductTotalPriceAfterDiscount = (product, quantity = 1) => {
    return ((1 - (product.sale / 100)) * product.customerPrice * quantity).toFixed(2)
}


export { calacPrices, calcProductTotalPriceAfterDiscount }