import { inicialGame } from './scripts/modal.js';
const btnStart = document.querySelector('.btn-start');

btnStart.addEventListener('click', inicialGame)

function blockBackButton() {
    history.pushState(null, "", location.href);
}

window.addEventListener("popstate", function () {
    history.pushState(null, "", location.href); 
    location.reload();
});

blockBackButton();