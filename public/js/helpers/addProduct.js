"use strict";

/* <div class="product-card sale">
<span class="badge">25%</span>
<img src="/public/assets/products/2.png" alt="Product Image">
<div class="rating">
    <span class="stars">&starf;&starf;&starf;&starf;&starf;</span> <span class="num">(536)</span>
</div>
<h3>Samsung Galaxy S21 5G</h3>
<div class="price">$2,300 <span class="discount">$2500</span></div>
</div> */

const addStars = (rate) => {
    let stars = "";
    console.log(rate)
    for (let i = 0; i < rate; i++) {
        stars += "&starf;"
    }
    for (let i = 0; i < 5 - rate; i++) {
        stars += "&star;"
    }
    console.log(stars)
    return stars;
}

const addProdcutCard = (target, data) => {
    const overlay = `<div class="overlay">
                        <button class="btn add-to-cart">Add to Cart</button>
                        <button class="btn add-to-wishlist">Add to Wishlist</button>
                    </div>`

    const discount = (1 - data.sale) * data.price
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

    p.innerText = `$${data.price}`;
    previousPrice.innerText = (1 - data.sale) * data.price;

    if (discount > data.price) {
        p.appendChild(previousPrice);
    }
    price.appendChild(p);
    card.append(img, rating, title, price)
    card.innerHTML += overlay;
    target.appendChild(card)
}

export { addProdcutCard };