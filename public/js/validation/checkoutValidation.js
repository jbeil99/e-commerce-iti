import { validateName } from "./registerValidation.js"


const validateZipCode = (zipcode) => {
    const regex = /^\d{5}(?:[-\s]\d{4})?$/g;
    const error = zipcode.parentElement.querySelector("p");

    if (!zipcode.value.match(regex)) {
        error.innerText = "Enter a vaild ZipCode";
        return false;
    }
    error.innerText = "";
    return true;
}

const vaildatePhone = (phone) => {
    const regex = /^01[0-2,5]\d{8}$/;
    const error = phone.parentElement.querySelector("p");
    if (!phone.value.match(regex)) {
        error.innerText = "Enter a vaild Phone number exampe 01155991822";
        return false;
    }
    error.innerText = "";
    return true;
}


const handleCheckout = (fname, lname, zipcode, phone) => {
    return validateName(fname) && validateName(lname) && validateZipCode(zipcode) && vaildatePhone(phone);
}

export { handleCheckout };