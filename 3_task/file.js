import { validate, showResult } from "../library.js";

const validateInput = (input, errorSelector) => {
    const isNotEmpty = validate.emptyField(input, errorSelector);
    const isNumber = isNotEmpty && validate.numValue(input, errorSelector);
    return isNotEmpty && isNumber;
}

//Assignment 1
document.querySelector("#btnCalculateBMI").addEventListener("click", () => {
    const inputWeight = document.querySelector("#inputWeight");
    const inputHeight = document.querySelector("#inputHeight");

    const isValidWeight = validateInput(inputWeight, ".errorWeight");
    const isValidHeight = validateInput(inputHeight, ".errorHeight");

    if (!isValidWeight || !isValidHeight) return;

    const weight = Number(inputWeight.value);
    const height = Number(inputHeight.value);
    const bmi = (weight / Math.pow((height / 100), 2)).toFixed(2);
    const underweightThreshold = 18.5;
    const normalThreshold = 24.9;
    const overweightThreshold = 29.9;

    if (bmi < underweightThreshold) {
        showResult(`Your BMI = ${bmi}. It is underweight. Consult your doctor, increase your caloric intake, and incorporate strength training to build muscle.`, ".BMIcalculation");
    } else if (bmi < normalThreshold) {
        showResult(`Your BMI = ${bmi}. It is normal. Maintain a balanced diet and regular physical activity to stay healthy.`, ".BMIcalculation");
    } else if (bmi < overweightThreshold) {
        showResult(`Your BMI = ${bmi}. It is overweight. Reduce your calorie intake and increase physical activity to control your weight.`, ".BMIcalculation");
    } else {
        showResult(`Your BMI = ${bmi}. It is obese. See a doctor, adjust your diet, and engage in regular physical activity to lose weight.`, ".BMIcalculation");
    }

    inputWeight.value = "";
    inputHeight.value = "";
});

//Assignment 2
const toggleVisibility = (hideSelectors, showSelectors) => {
    hideSelectors.forEach(selector => {
        document.querySelector(selector).style.display = "none";
    });
    showSelectors.forEach(selector => {
        document.querySelector(selector).style.display = "flex";
    });
}

document.querySelector(".circle").addEventListener("click", () => {
    toggleVisibility([".inputsRectangle", ".inputsTriangle"], [".inputCircle", "#btnCalculateCircle"]);
    document.querySelector(".calculation").textContent = "";
});
document.querySelector(".rectangle").addEventListener("click", () => {
    toggleVisibility([".inputCircle", ".inputsTriangle"], [".inputsRectangle", "#btnCalculateRectangle"]);
    document.querySelector(".calculation").textContent = "";
});
document.querySelector(".triangle").addEventListener("click", () => {
    toggleVisibility([".inputCircle", ".inputsRectangle"], [".inputsTriangle", "#btnCalculateTriangle"]);
    document.querySelector(".calculation").textContent = "";
});

document.querySelector("#btnCalculateCircle").addEventListener("click", () => {
    const inputRadius = document.querySelector("#inputRadius");
    const isValidRadius = validateInput(inputRadius, ".errorRadius");
    if (!isValidRadius) return;

    const getCircleArea = radius => Math.PI * Math.pow(radius, 2);
    const getCirclePerimetr = radius => 2 * Math.PI * radius;

    const radius = Number(inputRadius.value);
    const area = getCircleArea(radius).toFixed(2);
    const perimetr = getCirclePerimetr(radius).toFixed(2);

    showResult(`Circle area = ${area} Circle perimetr = ${perimetr}`, ".calculation");
    inputRadius.value = "";
});

document.querySelector("#btnCalculateRectangle").addEventListener("click", () => {
    const inputLength = document.querySelector("#inputLength");
    const inputWidth = document.querySelector("#inputWidth");
    const isValidLength = validateInput(inputLength, ".errorLength");
    const isValidWidth = validateInput(inputWidth, ".errorWidth");
    if (!isValidLength || !isValidWidth) return;

    const getRectArea = (length, width) => length * width;
    const getRectPerimetr = (length, width) => 2 * (length + width);

    const length = Number(inputLength.value);
    const width = Number(inputWidth.value);
    const area = getRectArea(length, width);
    const perimetr = getRectPerimetr(length, width);

    showResult(`Rectangle area = ${area} Rectangle perimetr = ${perimetr}`, ".calculation");
    inputLength.value = "";
    inputWidth.value = "";
});

document.querySelector("#btnCalculateTriangle").addEventListener("click", () => {
    const inputSideA = document.querySelector("#inputSideA");
    const inputSideB = document.querySelector("#inputSideB");
    const inputSideC = document.querySelector("#inputSideC");
    const isValidSideA = validateInput(inputSideA, ".errorSideA");
    const isValidSideB = validateInput(inputSideB, ".errorSideB");
    const isValidSideC = validateInput(inputSideC, ".errorSideC");
    if (!isValidSideA || !isValidSideB || !isValidSideC) return;

    const getTrianglePerimetr = (a, b, c) => a + b + c;
    const getTriangleArea = (a, b, c) => {
        const p = getTrianglePerimetr(a, b, c) / 2;
        return Math.sqrt((p * (p - a) * (p - b) * (p - c)));
    }

    const sideA = Number(inputSideA.value);
    const sideB = Number(inputSideB.value);
    const sideC = Number(inputSideC.value);

    const isValidTriangle = (a, b, c) => (a + b > c) && (a + c > b) && (b + c > a);
    if (!isValidTriangle(sideA, sideB, sideC)) {
        document.querySelector(".calculation").classList.add("wrongTriangle");
        showResult(`The sum of two sides of a triangle must always be greater than the third side.`, ".calculation");
        return;
    }

    const area = getTriangleArea(sideA, sideB, sideC).toFixed(2);
    const perimetr = getTrianglePerimetr(sideA, sideB, sideC);

    document.querySelector(".calculation").classList.remove("wrongTriangle");
    showResult(`Triangle area = ${area} Triangle perimetr = ${perimetr}`, ".calculation");

    inputSideA.value = "";
    inputSideB.value = "";
    inputSideC.value = "";
});
