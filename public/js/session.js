"use strict";

const addNav = (name, href) => {
    const navUl = document.querySelector("nav ul");
    const dashboard = document.createElement("li");
    const link = document.createElement("a");
    link.innerText = name;
    link.href = href;
    dashboard.appendChild(link);
    navUl.appendChild(dashboard);
}

const addLogout = (profile, currentUser) => {
    profile.href = `/public/admin/user-details.html?id=${currentUser.id}`;
    profile.innerHTML = `<p id="welcome">Welcome,${currentUser.username}</p>
        <i class="fa-solid fa-right-from-bracket"></i>`;

    addNav("Profile", "/public/pages/profile.html")

    if (currentUser.role === "admin") {
        addNav("Dashboard", "/public/admin/admin.html")
    }
    if (currentUser.role === "seller") {
        addNav("Your Products", "/public/pages/sellerDashborad.html")
    }
}



window.addEventListener("load", () => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const profile = document.querySelector(".profile a:nth-child(2)");
    if (currentUser) {
        addLogout(profile, currentUser);
        // TODO: add message
        profile.addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.nodeName === "I") {
                sessionStorage.removeItem("user");
                window.location.href = "/public/pages/login.html";
            }
            if (e.target.nodeName === "P") {
                window.location.href = `/public/admin/user-details.html?id=${currentUser.id}`;
            }

        })
    }
})