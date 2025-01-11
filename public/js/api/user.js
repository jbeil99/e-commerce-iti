"use strict";

const getUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    return users
}

const addUser = async (body) => {
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (e) {
        console.log(e)
    }
}



export { getUsers, addUser };