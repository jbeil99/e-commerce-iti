import { getProduct } from "../api/product.js";
import { calcProductTotalPriceAfterDiscount } from "./calcPrices.js";


const addStars = (rate) => {
    let stars = "";
    for (let i = 0; i < rate; i++) {
        stars += "&starf;"
    }
    for (let i = 0; i < 5 - rate; i++) {
        stars += "&star;"
    }
    return stars;
}

// TODO: add DATE

const addProdcutCard = (target, data) => {
    const orverly = document.createElement('div');
    orverly.classList.add("overlay");
    const cartBtn = document.createElement("button");
    cartBtn.value = data.id;
    const whishBtn = document.createElement("button");
    whishBtn.value = data.id;
    cartBtn.innerText = "Add to Cart";
    whishBtn.innerText = "Add to Wishlist";

    cartBtn.classList.add("btn", "cart");
    whishBtn.classList.add("btn", "wishlist");
    orverly.append(cartBtn, whishBtn);
    if (data.quantity <= 0) {
        cartBtn.innerText = "Out of Stock";
        cartBtn.style.backgroundColor = "gray";
        cartBtn.disabled = true;
    }



    const discount = calcProductTotalPriceAfterDiscount(data);
    const card = document.createElement("div");
    card.classList.add('product-card');
    const img = document.createElement("img")
    const badge = document.createElement("span");
    badge.classList.add('badge');
    const rating = document.createElement("div");
    rating.classList.add('rating');
    const stars = document.createElement("span");
    stars.classList.add('stars');
    const num = document.createElement("span");
    num.classList.add('num');
    const title = document.createElement("h3");
    const price = document.createElement("div");
    price.classList.add('price');
    const p = document.createElement("p");
    const previousPrice = document.createElement("span");
    previousPrice.classList.add('discount');

    stars.innerHTML = addStars(data.rating);
    num.innerText = `(${data.reviews.length})`;
    rating.append(stars, num);

    img.src = data.image;
    title.innerText = data.name;

    p.innerText = `$${data.customerPrice}`;
    price.appendChild(p);

    const now = new Date();
    const productDate = new Date(data.createdAt);
    const days = Math.floor((now - productDate) / (1000 * 60 * 60 * 24));
    if (discount < data.customerPrice) {
        const badge = document.createElement("span");
        badge.classList.add("badge");
        badge.innerText = `- ${data.sale}%`
        p.innerText = `$${discount}`;
        previousPrice.innerText = `$${data.customerPrice}`;
        p.appendChild(previousPrice);
        card.classList.add("sale");
        card.append(badge, img, rating, title, price, orverly)
    } else if (days < 5) {
        const badge = document.createElement("span");
        badge.classList.add("badge");
        badge.innerText = "new"
        card.classList.add("new");
        card.append(badge, img, rating, title, price, orverly)
    }
    else {
        card.append(img, rating, title, price, orverly)
    }
    target.appendChild(card)
}


const addProdcutCart = async (target, data) => {
    const product = await getProduct(data.productID);

    if (product.sellerDeleted || !product.approved) {
        return false
    }

    const tr = document.createElement('tr');

    const removeBtn = document.createElement('button');
    removeBtn.id = 'removeBtn';
    removeBtn.value = product.id;
    removeBtn.innerText = 'Remove';
    removeBtn.type = "submit";
    const remove = document.createElement('td');
    remove.appendChild(removeBtn);
    tr.appendChild(remove);

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    productInfo.appendChild(img);

    const p = document.createElement('p');
    p.innerText = product.name;
    productInfo.appendChild(p);
    const info = document.createElement('td');
    info.appendChild(productInfo);
    tr.appendChild(info);

    const price = document.createElement('td');
    price.innerText = calcProductTotalPriceAfterDiscount(product);;
    tr.appendChild(price);

    const quantity = document.createElement('div');
    quantity.classList.add('quantity');

    const minusBtn = document.createElement('button');
    minusBtn.innerText = '-';
    minusBtn.id = "minusBtn";
    minusBtn.type = "button";
    quantity.appendChild(minusBtn);

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.id = product.id;
    quantityInput.value = data.quantity;
    quantity.appendChild(quantityInput);

    const plusBtn = document.createElement('button');
    plusBtn.innerText = '+';
    plusBtn.id = "plusBtn";
    plusBtn.type = "button";
    quantity.appendChild(plusBtn);
    const td = document.createElement('td');
    td.appendChild(quantity);
    tr.appendChild(td);

    const total = document.createElement('td');
    total.classList.add('subtotal');
    total.innerText = calcProductTotalPriceAfterDiscount(product, data.quantity);
    tr.appendChild(total);

    target.appendChild(tr);
}

const addProdcutOrder = async (target, data) => {
    const product = await getProduct(data.productID);
    const tr = document.createElement('tr');


    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    productInfo.appendChild(img);

    const p = document.createElement('p');
    p.innerText = product.name;
    productInfo.appendChild(p);
    const info = document.createElement('td');
    info.appendChild(productInfo);
    tr.appendChild(info);

    const price = document.createElement('td');
    price.innerText = calcProductTotalPriceAfterDiscount(product);;
    tr.appendChild(price);


    const quantity = document.createElement('td');
    quantity.innerText = data.quantity;
    tr.appendChild(quantity);

    const total = document.createElement('td');
    total.classList.add('subtotal');
    total.innerText = calcProductTotalPriceAfterDiscount(product, data.quantity);
    tr.appendChild(total);

    target.appendChild(tr);
}

const addProductCheckout = async (target, data) => {
    const product = await getProduct(data.productID);
    const productDiv = document.createElement("div");
    productDiv.classList.add("product")
    const img = document.createElement("img");
    img.alt = product.name;
    const div = document.createElement("div");
    const price = document.createElement("p");
    const span = document.createElement("span");
    const p = document.createElement("p");

    img.src = product.image;
    p.innerText = product.name;
    price.innerText = ` ${data.quantity} x `;
    span.innerText = `$${calcProductTotalPriceAfterDiscount(product)}`
    price.appendChild(span);
    div.append(p, price);
    productDiv.append(img, div)
    target.appendChild(productDiv)
}

const addProductWishlist = async (target, data) => {
    const product = await getProduct(data.productID);
    if (product.sellerDeleted || !product.approved) {
        return false
    }

    const tr = document.createElement('tr');
    const removeBtn = document.createElement('button');
    removeBtn.id = 'removeBtn';
    removeBtn.value = product.id;
    removeBtn.innerText = 'Remove';
    removeBtn.type = "submit";
    const remove = document.createElement('td');
    remove.appendChild(removeBtn);
    tr.appendChild(remove);


    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    productInfo.appendChild(img);

    const p = document.createElement('p');
    p.innerText = product.name;
    productInfo.appendChild(p);
    const info = document.createElement('td');
    info.appendChild(productInfo);
    tr.appendChild(info);

    const price = document.createElement('td');
    price.innerText = calcProductTotalPriceAfterDiscount(product);;
    tr.appendChild(price);

    const add = document.createElement("td");
    const addBtn = document.createElement("button");
    addBtn.classList.add("btn");
    addBtn.innerText = "Add to cart";
    add.appendChild(addBtn)
    addBtn.value = product.id;
    addBtn.id = "add";
    tr.appendChild(add)

    target.appendChild(tr);
}

export { addProdcutCard, addProdcutCart, addProductCheckout, addProdcutOrder, addProductWishlist };