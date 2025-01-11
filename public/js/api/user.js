"use strict";

const getUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    return users
}




export { getUsers };