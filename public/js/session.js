"use strict";

window.addEventListener("load", () => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const profile = document.querySelector(".profile a:nth-child(2)");
    if (currentUser) {
        profile.href = "";
        profile.innerHTML = `<p id="welcome">Welcome, ${currentUser.username}</p>
        <i class="fa-solid fa-right-from-bracket"></i>`
    }
    profile.addEventListener("click", () => {
        sessionStorage.removeItem("user");
    })
})