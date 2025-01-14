"use strict";
const currentUser = JSON.parse(sessionStorage.getItem("user"))

const editGuard = (userID) => {
    if (currentUser.role !== "admin" && currentUser.id !== userID) {
        window.location.href = "/shop.html";
        return false
    }
    return true;
}
const addProductGuard = () => {
    if (currentUser.role !== "seller" && currentUser.role !== "admin") {
        window.location.href = "/shop.html";
    }
}

export { editGuard, addProductGuard };