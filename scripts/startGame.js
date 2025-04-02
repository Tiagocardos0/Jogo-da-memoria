import { classification, modalFinishedGame } from './modal.js';

const cards = document.querySelectorAll('.flip-card')
const buttonReset = document.querySelector('.reload')
const icons = document.querySelectorAll('i')
const btnClassification = document.querySelector('.btnClassification');
const btnStart = document.querySelector('.start');
const btnBack = document.querySelector('.back');

let runningTransitions = []
let gameRunning = false;
let startTime;
let elapsedTime = 0;
let timerInterval;

function blockBackButton() {
    history.pushState(null, "", location.href);
}

window.addEventListener("popstate", function () {
    history.pushState(null, "", location.href);
    location.reload();
});

blockBackButton();

document.addEventListener('DOMContentLoaded', () => {
    startGame()
})

document.addEventListener('DOMContentLoaded', () => {
    randomCards()
    checkIfAllCardsAreVisible()
})

const imgIcons = [
    {
        class: 'ph-fill ph-heart',
        color: 'red',
        value: 1,
        match: false
    },

    {
        class: 'ph-fill ph-flower',
        color: 'pink',
        value: 2
    },

    {
        class: 'ph-fill ph-van',
        color: 'blue',
        value: 3
    },

    {
        class: 'ph-fill ph-basketball',
        color: 'orange',
        value: 4
    },

    {
        class: 'ph-fill ph-piggy-bank',
        color: 'deeppink',
        value: 5
    },

    {
        class: 'ph-fill ph-airplane-tilt',
        color: 'white',
        value: 6
    }

]

export function startGame() {
    if (!gameRunning) {
        startTime = Date.now();
        elapsedTime = 0;

        if (timerInterval) {
            clearInterval(timerInterval);
        }

        timerInterval = setInterval(updateTimer, 1000);
        gameRunning = true;

        const timer = document.getElementById('timer')
        if(timer) {
            timer.textContent = formatTime(elapsedTime);
        }
    }
}

function stopGame() {
    clearInterval(timerInterval); 
    gameRunning = false; 
    localStorageresult()
    modalFinishedGame()
}

export function resetGame() {
    resetTimer();
    esconderCartas();
    randomCards();
}

function formatTime(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
}

function resetTimer() {
    elapsedTime = 0;
    startTime = Date.now();
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(updateTimer, 1000);

    document.getElementById('timer').textContent = formatTime(elapsedTime);
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;  
    document.getElementById('timer').textContent = formatTime(elapsedTime);
}

function checkIfAllCardsAreVisible() {
    const allVisible = Array.from(cards).every(card => card.classList.contains('toggle'));
    if (allVisible) {
        stopGame();
    }
}

function localStorageresult() {
    const playerTime = formatTime(elapsedTime);
    const playerName = localStorage.getItem('player');

    if (!playerName) {
        alert('Nome do jogador não encontrado.');
        return;
    }

    let listPlayers = JSON.parse(localStorage.getItem('playerList')) || [];

    const newPlayer = { name: playerName, time: playerTime };

    listPlayers.push(newPlayer);
    localStorage.setItem('playerList', JSON.stringify(listPlayers));
}

cards.forEach(card => {
    card.addEventListener('click', toggleCards)
    card.addEventListener('transitionend', transitionToggle)
});

function transitionToggle(event) {
    runningTransitions = runningTransitions.filter(card => card != event.currentTarget)


    let enableToggles = 0

    const valueToggle = {}
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i]
        if (card.classList.contains('toggle')) {
            let classes = card.querySelector('i').className
            const toggleIcon = valueToggle[classes]

            if (toggleIcon === undefined) {
                valueToggle[classes] = card
                enableToggles++
            } else {
                delete valueToggle[classes]
                enableToggles--
            }
        }
    }

    if (enableToggles >= 2 && runningTransitions.length === 0) {
        Object.values(valueToggle).forEach(target => {
            target.classList.toggle('toggle')
        })
    }
}

function toggleCards(event) {
    if (runningTransitions.length > 0) {
        return
    }

    if (event.currentTarget.classList.contains('toggle')) {
        return
    }
    event.currentTarget.classList.toggle('toggle')
    runningTransitions.push(event.currentTarget)
    checkIfAllCardsAreVisible();
}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function randomCards() {
    setTimeout(() => {
        let number = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
        number = embaralhar(number)

        for (let i = 0; i <= 11; i++) {
            if (icons[i]) {
                icons[i].style.color = imgIcons[number[i]].color;
                icons[i].setAttribute('class', imgIcons[number[i]].class);
            }
        }
    }, 500)
}

function esconderCartas() {
    cards.forEach(toggle => {
        toggle.classList.remove('toggle')
    })
}

if (btnStart) {
    btnStart.addEventListener('click', () => {
        playerInformation();
    });
}

if (btnClassification) {
    btnClassification.addEventListener('click', () => {
        classification();
    });
}

if (btnBack) {
    btnBack.addEventListener('click', () => {
        location.href = 'index.html';
    });
}

if (buttonReset) {
    buttonReset.addEventListener('click', () => {
        resetGame();
    });
}
