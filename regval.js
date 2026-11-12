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
const SVG_NS = "http://www.w3.org/2000/svg"; // definuje ten SVG prostor názvů, který je potřeba pro vytváření SVG tvarů.
const SHAPE_COUNT = 25; // počet tvarů
const SHAPE_COLORS = ["#ef7f1a", "#00a0e3"]; // barvy pro tvary

// Vytvoření SVG elementu
const scatter = document.createElementNS(SVG_NS, "svg"); // Vytvoří nový SVG element pro umístění tvarů.
scatter.setAttribute("class", "scatter"); // Přiřadí SVG elementu CSS třídu scatter.
document.body.prepend(scatter); // Vloží SVG element na začátek těla HTML stránky.

function drawScatter() { // funkca která vykresluje náhodné tvary.
scatter.replaceChildren(); // Odstraní všechny dosud vytvořené tvary.

const w = window.innerWidth; // Zjistí šířku okna prohlížeče.
const h = window.innerHeight; // Zjistí výšku okna prohlížeče.

let created = 0; // Počítá počet již vytvořených tvarů.
let tries = 0; // Počítá počet pokusů o vytvoření tvarů.

while (created < SHAPE_COUNT && tries < 500) { // Opakuje vytváření tvarů, dokud jich není 25 nebo dokud nedosáhne 500 pokusů.
tries++; // Zvýší počet pokusů o jednu.

const size = 20 + Math.random() * 50; // Vygeneruje náhodnou velikost tvaru od 20 do 70 pixelů.
const x = Math.random() * (w - size); // Vypočítá náhodnou vodorovnou pozici tvaru.
const y = Math.random() * (h - size); // Vypočítá náhodnou svislou pozici tvaru.

const color = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)]; // Náhodně vybere jednu z dostupných barev.
let shape; // Vytvoří proměnnou, do které se uloží čtverec nebo kruh.

if (Math.random() < 0.5) { // Náhodně rozhodne, zda se vytvoří čtverec.
    // Čtverec
    shape = document.createElementNS(SVG_NS, "rect"); // Vytvoří SVG obdélník.
    shape.setAttribute("x", String(x)); // Nastaví vodorovnou pozici čtverce.
    shape.setAttribute("y", String(y)); // Nastaví svislou pozici čtverce.
    shape.setAttribute("width", String(size)); // Nastaví šířku čtverce.
    shape.setAttribute("height", String(size)); // Nastaví výšku čtverce.
} else { // Pokud podmínka neplatí, vytvoří se kruh.
    // Kruh
    shape = document.createElementNS(SVG_NS, "circle"); // Vytvoří SVG kruh.
    shape.setAttribute("cx", String(x + size / 2)); // Nastaví vodorovnou souřadnici středu kruhu.
    shape.setAttribute("cy", String(y + size / 2)); // Nastaví svislou souřadnici středu kruhu.
    shape.setAttribute("r", String(size / 2)); // Nastaví poloměr kruhu.
}

shape.setAttribute("fill", color); // Nastaví barvu výplně tvaru.
shape.setAttribute("opacity", "0.6"); // Nastaví průhlednost tvaru na 60 %.
scatter.appendChild(shape); // Vloží vytvořený tvar do SVG elementu.
created++; // Zvýší počet vytvořených tvarů o jednu.
}
}

drawScatter(); // Poprvé spustí funkci pro vykreslení tvarů.
window.addEventListener("resize", drawScatter); // Při změně velikosti okna znovu rozmístí všechny tvary.