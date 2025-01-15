"use strict";

const displayMessage = (message, text, color, time = 5000) => {
    message.innerText = text;
    message.style.display = "block";
    message.style.backgroundColor = color;
    setTimeout(() => { message.style.display = "none" }, time)
}

const displayNothingFound = (table, name) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerText = `There is no ${name} Found`;
    td.colSpan = 12;
    tr.appendChild(td);
    table.appendChild(tr)
}


export { displayMessage, displayNothingFound };