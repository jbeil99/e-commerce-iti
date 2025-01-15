"use strict";

const currentUser = JSON.parse(sessionStorage.getItem("user"))

const checkUserAuth = () => {
    if (!currentUser) {
        window.location.href = "/public/pages/login.html";
        return null;
    }
    return currentUser;
}


const addRoleGuard = (allowedRoles, redirect) => {
    if (currentUser) {
        if (!allowedRoles.includes(currentUser.role)) {
            window.location.href = redirect;
        }
    }
}

const editGuard = (userID) => {
    if ((currentUser.role !== "admin" || currentUser.role !== "manger") && currentUser.id !== userID) {
        window.location.href = window.location.href.split("?")[0] + `?id=${currentUser.id}`;
        return false
    }
    return updateRoleGuard(userID);
}

const updateRoleGuard = (userID) => {
    if (currentUser.id !== userID && (currentUser.role !== "admin" || currentUser.role !== "manger")) {
        return false;
    }
    return true
}

export { checkUserAuth, addRoleGuard, editGuard, updateRoleGuard };