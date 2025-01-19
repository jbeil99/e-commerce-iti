"use strict";
const currentUser = JSON.parse(sessionStorage.getItem("user"))

const editGuard = (userID) => {
    if (currentUser.role !== "admin" && currentUser.role !== "manger" && currentUser.id !== userID) {
        window.location.href = "/index.html";
        return false
    }
    return true;
}
const addProductGuard = () => {
    if (currentUser.role !== "seller" && currentUser.role !== "admin" && currentUser.role !== "manger") {
        window.location.href = "/index.html";
    }
}

export { editGuard, addProductGuard };