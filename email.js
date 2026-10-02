document.getElementById("formular").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let vysledek = document.getElementById("vysledek");

    if (email.includes("@")) {
        vysledek.textContent = "E-mail je správně.";
    } else {
        vysledek.textContent = "E-mail musí obsahovat znak @.";
    }
});