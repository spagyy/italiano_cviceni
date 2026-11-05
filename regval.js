// Registration form validation

const MAX_AGE = 110;

const form = document.getElementById("registration-form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const birthDateInput = document.getElementById("birth-date");
const emailInput = document.getElementById("email");
const successMessage = document.getElementById("success-message");

// Shows or clears the error message of a field
function setError(input, message) {
    const errorElement = document.getElementById("error-" + input.id);
    errorElement.textContent = message;
    input.classList.toggle("invalid", message !== "");
    input.classList.toggle("valid", message === "");
}

// First name and last name: required, no digits allowed
function validateName(input, label) {
    const value = input.value.trim();
    let message = "";

    if (value === "") {
        message = label + " je povinné.";
    } else if (/\d/.test(value)) {
        message = label + " nesmí obsahovat čísla.";
    }

    setError(input, message);
    return message === "";
}

// Birth date: not in the future, not older than 110 years
function validateBirthDate() {
    const value = birthDateInput.value;
    let message = "";

    if (value === "") {
        message = "Zadejte datum narození.";
    } else {
        const birthDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const oldestAllowed = new Date(today);
        oldestAllowed.setFullYear(oldestAllowed.getFullYear() - MAX_AGE);

        if (isNaN(birthDate.getTime())) {
            message = "Datum není platné.";
        } else if (birthDate > today) {
            message = "Datum narození nesmí být v budoucnosti.";
        } else if (birthDate < oldestAllowed) {
            message = "Věk nesmí být vyšší než " + MAX_AGE + " let.";
        }
    }

    setError(birthDateInput, message);
    return message === "";
}

// Email: must contain an @ character
function validateEmail() {
    const value = emailInput.value.trim();
    let message = "";

    if (value === "") {
        message = "E-mail je povinný.";
    } else if (!value.includes("@")) {
        message = "E-mail musí obsahovat zavináč (@).";
    }

    setError(emailInput, message);
    return message === "";
}

// Validate a field when the user leaves it
firstNameInput.addEventListener("blur", () => validateName(firstNameInput, "Jméno"));
lastNameInput.addEventListener("blur", () => validateName(lastNameInput, "Příjmení"));
birthDateInput.addEventListener("blur", validateBirthDate);
emailInput.addEventListener("blur", validateEmail);

// Limit the date picker: no future dates, nothing older than MAX_AGE years
(function setDatePickerLimits() {
    const today = new Date();
    const oldestAllowed = new Date(today);
    oldestAllowed.setFullYear(today.getFullYear() - MAX_AGE);
    const toIsoDate = (date) => date.toISOString().split("T")[0];
    birthDateInput.max = toIsoDate(today);
    birthDateInput.min = toIsoDate(oldestAllowed);
})();

// Form submit
form.addEventListener("submit", function (event) {
    event.preventDefault();
    successMessage.textContent = "";

    // Run every check so that all errors are shown at once
    const results = [
        validateName(firstNameInput, "Jméno"),
        validateName(lastNameInput, "Příjmení"),
        validateBirthDate(),
        validateEmail()
    ];

    if (results.every(Boolean)) {
        successMessage.textContent = "Registrace proběhla úspěšně.";
        form.reset();
        [firstNameInput, lastNameInput, birthDateInput, emailInput].forEach((input) =>
            input.classList.remove("valid", "invalid")
        );
    }
});

// Náhodně rozházené čtverce a kruhy po celé stránce
const SVG_NS = "http://www.w3.org/2000/svg";
const SHAPE_COUNT = 25;
const SHAPE_COLORS = ["#ef7f1a", "#00a0e3"];

const scatter = document.createElementNS(SVG_NS, "svg");
scatter.setAttribute("class", "scatter");
document.body.prepend(scatter);

function drawScatter() {
    scatter.replaceChildren();

    const w = window.innerWidth;
    const h = window.innerHeight;
    const card = document.querySelector(".card").getBoundingClientRect();
    const gap = 10; // volné místo kolem karty

    let created = 0;
    let tries = 0;

    while (created < SHAPE_COUNT && tries < 500) {
        tries++;

        const size = 20 + Math.random() * 50;
        const x = Math.random() * (w - size);
        const y = Math.random() * (h - size);

        // Přeskoč tvary, které by zasahovaly do karty
        const overlapsCard =
            x + size > card.left - gap && x < card.right + gap &&
            y + size > card.top - gap && y < card.bottom + gap;
        if (overlapsCard) continue;

        const color = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)];
        let shape;

        if (Math.random() < 0.5) {
            // Čtverec
            shape = document.createElementNS(SVG_NS, "rect");
            shape.setAttribute("x", String(x));
            shape.setAttribute("y", String(y));
            shape.setAttribute("width", String(size));
            shape.setAttribute("height", String(size));
        } else {
            // Kruh
            shape = document.createElementNS(SVG_NS, "circle");
            shape.setAttribute("cx", String(x + size / 2));
            shape.setAttribute("cy", String(y + size / 2));
            shape.setAttribute("r", String(size / 2));
        }

        shape.setAttribute("fill", color);
        shape.setAttribute("opacity", "0.6");
        scatter.appendChild(shape);
        created++;
    }
}

drawScatter();
window.addEventListener("resize", drawScatter); // přegeneruje při změně velikosti okna