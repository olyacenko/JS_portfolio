import { validate, showResult } from "../library.js";

//Assignment 1
document.querySelector("#btnDate").addEventListener("click", () => {
    const today = new Date();
    const currentDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

    showResult(`Today is ${currentDate}`, ".date");
});

//Assignment 2
document.querySelector("#btnWeek").addEventListener("click", () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const day = days[today.getDay()];

    showResult(`It's ${day}`, ".week");
});

//Assignment 3
document.querySelector("#btnTime").addEventListener("click", () => {
    const today = new Date();
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    showResult(`It's ${time} o'clock`, ".time");
});

//Assignment 4
document.querySelector("#btnLeapYear").addEventListener("click", () => {
    const yearInput = document.querySelector("#inputLeapYear");

    validate.emptyField(yearInput, ".errorLeapYear");
    const invalidEmpty = document.querySelector(".invalid");
    if (invalidEmpty) { yearInput.value = ""; return; }

    validate.numValue(yearInput, ".errorLeapYear");
    const invalidNum = document.querySelector(".invalid");
    if (invalidNum) { yearInput.value = ""; return; }

    const year = yearInput.value;
    const yearNum = Number(yearInput.value);
    const isLeapYear = yearNum % 4 === 0 && (yearNum % 100 !== 0 || yearNum % 400 === 0);

    if (year.length == 4) {
        if (isLeapYear) {
            showResult(`${year} is a leap year.`, ".leapYear");
        } else {
            showResult(`${year} is a non-leap year.`, ".leapYear");
        }
    } else {
        document.querySelector(".error").style.display = "block";
        showResult("Year must be 4 digits.", ".errorLeapYear");
    }
    yearInput.value = "";
});

//Assignment 5
document.querySelector("#btnEvenOdd").addEventListener("click", () => {
    const numInput = document.querySelector("#inputEvenOdd");

    validate.emptyField(numInput, ".errorEvenOdd");
    const invalidEmpty = document.querySelector(".invalid");
    if (invalidEmpty) { numInput.value = ""; return; }

    validate.numValue(numInput, ".errorEvenOdd");
    const invalidNum = document.querySelector(".invalid");
    if (invalidNum) { numInput.value = ""; return; }

    const valueNumInput = numInput.value;
    const number = Number(valueNumInput);
    const odd = number % 2 != 0;
    const even = number % 2 == 0;
    if (odd) {
        showResult(`${number} is an odd number.`, ".evenOdd");
    } else if (even) {
        showResult(`${number} is an even number.`, ".evenOdd");
    }
    numInput.value = "";
});

//Assignment 6
document.querySelector("#btnToC").addEventListener("click", () => {
    const tempInput = document.querySelector("#inputTemp");

    validate.emptyField(tempInput, ".errorTemp");
    const invalidEmpty = document.querySelector(".invalid");
    if (invalidEmpty) { tempInput.value = ""; return; }

    validate.numValue(tempInput, ".errorTemp");
    const invalidNum = document.querySelector(".invalid");
    if (invalidNum) { tempInput.value = ""; return; }

    const temp = tempInput.value;
    const tempF = Number(temp);
    const tempC = 5 / 9 * (tempF - 32);

    showResult(`${tempC.toFixed(1)} °C`, ".toCelsius");

    tempInput.value = "";
});

document.querySelector("#btnToF").addEventListener("click", () => {
    const tempInput = document.querySelector("#inputTemp");

    validate.emptyField(tempInput, ".errorTemp");
    const invalidEmpty = document.querySelector(".invalid");
    if (invalidEmpty) { tempInput.value = ""; return; }

    validate.numValue(tempInput, ".errorTemp");
    const invalidNum = document.querySelector(".invalid");
    if (invalidNum) { tempInput.value = ""; return; }

    const temp = tempInput.value;
    const tempC = Number(temp);
    const tempF = 9 / 5 * tempC + 32;

    showResult(`${tempF.toFixed(1)} ℉`, ".toFahrenheit");

    tempInput.value = "";
});
