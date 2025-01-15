

const fillUserData = (username, email, fname, lname, user, select, saveBtn) => {
    username.value = user.username;
    email.value = user.email;
    fname.value = user.firstName;
    lname.value = user.lastName;
    if (select) {
        saveBtn.innerText = "Save";
        saveBtn.id = "save";
        for (let r of select) {
            if (r.value === user.role) {
                r.selected = true;
            }
        }
    }
}

export { fillUserData }