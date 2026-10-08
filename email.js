const form = document.querySelector("form");
const email = document.getElementById("email");

form.addEventListener("submit", function (event) {
    if (!email.value.includes("@")) {
        event.preventDefault();
        alert("E-mail musí obsahovat @!");
    } else {
        alert("E-mail je v pořádku, formulář byl odeslán.");
    }
});