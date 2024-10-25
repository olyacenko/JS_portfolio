// import { library } from "./model.js"

export const showResult = (result, selector) => document.querySelector(selector).textContent = result;

export const validate = {
    numValue(element, errorElementSelector) {
        const errorElement = document.querySelector(errorElementSelector);

        element.classList.remove("valid", "invalid");
        errorElement.style.display = "none";

        const val = Number(element.value.trim());

        if (isNaN(val)) {
            errorElement.textContent = "Entered value must be a number";
            element.classList.add("invalid");
            errorElement.style.display = "block";
            return;
        } else {
            element.classList.add("valid");
        }

    },

    emptyField(element, errorElementSelector) {
        let errorElement = document.querySelector(errorElementSelector);

        element.classList.remove("valid", "invalid");
        errorElement.style.display = "none";

        if (element.value.trim().length > 0) {
            element.classList.add("valid");
        } else {
            element.classList.add("invalid");
            errorElement.textContent = "Field cannot be empty";
            errorElement.style.display = "block";
        }
    },

    dublicate(element, errorElementSelector) {
        const errorElement = document.querySelector(errorElementSelector);

        const bookTitle = element.value.trim();

        if (!bookTitle) return;

        element.classList.remove("valid", "invalid");
        errorElement.style.display = "none";

        if (library.isDuplicate(bookTitle)) {
            errorElement.textContent = "Book by the title already exists";
            element.classList.add("invalid");
            errorElement.style.display = "block";
        } else {
            element.classList.add("valid");
        }
    },

    year(element, errorElementSelector) {
        let errorElement = document.querySelector(errorElementSelector);

        element.classList.remove("valid", "invalid");
        errorElement.style.display = "none";

        const yearValue = element.value.trim();
        const currentYear = new Date().getFullYear();

        if (isNaN(yearValue)) {
            errorElement.textContent = "The year must be a number";
            element.classList.add("invalid");
            errorElement.style.display = "block";
            return;
        }
        const year = Number(yearValue);

        if (year < 1450 || year > currentYear) {
            errorElement.textContent = `The year must be between 1450 and ${currentYear}`;
            element.classList.add("invalid");
            errorElement.style.display = "block";
            return;
        }
        element.classList.add("valid");
    }
}
