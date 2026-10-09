const today = new Date().toLocaleDateString('sv'); // YYYY-MM-DD v lokálním čase
const nameRe = /^\p{L}+(?:[ '-]\p{L}+)*$/u;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// vrabei chyb
const rules = {
    firstName: v => !v ? 'Jméno je povinné.' : !nameRe.test(v) ? 'Jméno smí obsahovat jen písmena.' : '',
    lastName:  v => !v ? 'Příjmení je povinné.' : !nameRe.test(v) ? 'Příjmení smí obsahovat jen písmena.' : '',
    birthdate: v => !v ? 'Datum narození je povinné.' : v < '1920-01-01' ? 'Rok narození nesmí být dřívější než 1920.' : v > today ? 'Datum nesmí být v budoucnosti.' : '',
    email:     v => !v ? 'E-mail je povinný.' : !emailRe.test(v) ? 'Zadej platný e-mail.' : ''
};

const form = document.getElementById('myForm');
form.birthdate.max = today;

function check(id) {
    const input = form[id];
    const msg = rules[id](input.value.trim());
    document.getElementById(id + '-error').textContent = msg;
    input.classList.toggle('invalid', !!msg);
    return !msg;
}

form.addEventListener('submit', e => {
    // map() zkontroluje všechna pole, takže se ukážou všechny chyby najednou
    if (!Object.keys(rules).map(check).every(Boolean)) e.preventDefault();
});

// Průběžná validaci po opuštění pole
form.addEventListener('focusout', e => e.target.name in rules && check(e.target.name));