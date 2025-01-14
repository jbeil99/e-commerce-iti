"use strict";

const displayMessage = (message, text, color, time = 5000) => {
    message.innerText = text;
    message.style.display = "block";
    message.style.backgroundColor = color;
    setTimeout(() => { message.style.display = "none" }, time)
}



export { displayMessage };