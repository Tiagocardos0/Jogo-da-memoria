import { startGame ,resetGame } from "./startGame.js";
export function inicialGame() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const div = document.createElement('div');
    div.style.zIndex = "1000";
    div.style.position = "absolute";
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.transform = "translate(-50%, -50%)";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.gap = "10px";
    div.style.color = "white";
    div.style.backgroundColor = "#0a0146";
    div.style.width = "100%";
    div.style.height = "300px";/*  */
    div.style.justifyContent = 'space-evenly';
    modal.appendChild(div);

    const title = document.createElement('h1');
    title.textContent = 'Bem-vindo ao Jogo!';
    title.style.color = '#fff';
    div.appendChild(title);

    const playerName = document.createElement('input');
    playerName.type = 'text';
    playerName.placeholder = 'Digite seu nome';
    playerName.style.border = 'none';
    playerName.style.padding = '10px';
    playerName.style.borderRadius = '5px';
    playerName.style.fontSize = '1.1rem';

    const buttonStart = document.createElement('button');
    buttonStart.textContent = 'Começar!';
    buttonStart.classList.add('style-button-modal');
    buttonStart.addEventListener('click', () => {
        if (playerName.value.trim() === '') {
            alert('Digite um nome válido');
            return;
        }

        localStorage.removeItem('player');
        const playerList = JSON.parse(localStorage.getItem('playerList')) || [];
        playerList.push({ name: playerName.value });
        localStorage.setItem('player', playerName.value);

        if (window.location.pathname === '/index.html') {
            modal.remove();
            location.href = 'page/startGame.html';  // Caminho correto para o arquivo dentro da pasta 'page'
        } else if (window.location.pathname === '/page/startGame.html') {  // Verificando o caminho correto do startGame
            resetGame();
            modal.remove();
        }

    });
    
    const buttonBack = document.createElement('button');
    buttonBack.textContent = 'Sair';
    buttonBack.classList.add('style-button-modal');
    buttonBack.addEventListener('click', () => {
        modal.remove();
    })
    div.appendChild(playerName);
    div.appendChild(buttonStart);
    div.appendChild(buttonBack);
    document.body.appendChild(modal);
}

export function playerInformation() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const div = document.createElement('div');
    div.style.zIndex = "1000";
    div.style.position = "absolute";
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.transform = "translate(-50%, -50%)";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.gap = "10px";
    div.style.color = "white";
    div.style.backgroundColor = "#0a0146";
    div.style.width = "100%";
    div.style.height = "300px";
    div.style.justifyContent = 'space-evenly';
    modal.appendChild(div);

    const title = document.createElement('h1');
    title.textContent = 'Novo Jogador';
    title.style.color = '#fff';
    div.appendChild(title);

    const playerName = document.createElement('input');
    playerName.type = 'text';
    playerName.placeholder = 'Digite seu nome';
    playerName.style.border = 'none';
    playerName.style.padding = '10px';
    playerName.style.borderRadius = '5px';
    playerName.style.fontSize = '1.1rem';

    const button = document.createElement('button');
    button.textContent = 'Começar!';
    button.classList.add('style-button-modal');
    button.addEventListener('click', () => {
        if (playerName.value.trim() === '') {
            alert('Digite um nome válido');
            return;
        }

        localStorage.removeItem('player');
        const playerList = JSON.parse(localStorage.getItem('playerList')) || [];
        playerList.push({ name: playerName.value });
        localStorage.setItem('player', playerName.value);

        if (window.location.pathname === '/index.html') {
            modal.remove();
            location.href = 'startGame.html';
        } else if (window.location.pathname === '/startGame.html') {
            resetGame()
            modal.remove();
        }
    });

    div.appendChild(playerName);
    div.appendChild(button);
    document.body.appendChild(modal);
}

export function classification() {
    const modal = document.createElement('div');
    modal.style.position = 'absolute';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.width = '100%';
    modal.style.height = '100vh';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    function convertTimeToSeconds(time) {
        let [minutes, seconds] = time.split(":").map(Number);
        return minutes * 60 + seconds;
    }
    
    const listPlayers = JSON.parse(localStorage.getItem('playerList')) || [];
    listPlayers.sort((a, b) => {
        const timeA = convertTimeToSeconds(a.time);
        const timeB = convertTimeToSeconds(b.time);
        return timeA - timeB;
    });

    if (listPlayers.length > 0) {
        const container = document.createElement('div');
        container.style.backgroundColor = '#0a0146';
        container.style.width = '100%';
        container.style.height = 'auto';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '20px';
        container.style.alignItems = 'center';
        container.style.paddingBlock = '20px';

        const title = document.createElement('h1');
        title.textContent = 'Classificação:';
        title.style.width = '100%';
        title.style.textAlign = 'center';
        title.style.color = 'white';
        title.style.fontSize = '1.5rem';
        title.style.borderBottom = '1px solid #fff';
        title.style.paddingBottom = '10px';
        container.appendChild(title);

        const playerNameElement = document.createElement('div');
        playerNameElement.style.color = 'white';
        playerNameElement.style.display = 'flex';
        playerNameElement.style.flexDirection = 'column';
        playerNameElement.style.alignItems = 'center';
        playerNameElement.style.width = 'auto';
        playerNameElement.style.height = '300px';
        playerNameElement.style.fontSize = '1.5rem';
        playerNameElement.style.padding = '20px';
        playerNameElement.style.borderRadius = '10px';
        playerNameElement.style.overflow = 'auto';

        playerNameElement.style.scrollbarWidth = 'thin';
        playerNameElement.style.scrollbarColor = '#533d8aaa transparent';
        container.appendChild(playerNameElement);

        listPlayers.forEach(player => {
            const playerName = document.createElement('p');
            playerName.textContent = `${player.name} - ${player.time}`;
            playerName.style.color = 'white';
            playerName.style.fontSize = '1.5rem';
            playerName.style.textAlign = 'center';
            playerNameElement.appendChild(playerName);
        });

        const buttonExit = document.createElement('button');
        buttonExit.textContent = 'Sair';
        buttonExit.classList.add('style-button-modal');
        buttonExit.addEventListener('click', () => {
            modal.remove();
        });

        const buttonClear = document.createElement('button');
        buttonClear.textContent = 'Limpar Classificação';
        buttonClear.classList.add('style-button-modal');
        buttonClear.addEventListener('click', () => {
            localStorage.removeItem('playerList');
            playerNameElement.innerHTML = '';
            playerNameElement.innerHTML = 'Sem classificação';
        });

        container.appendChild(buttonClear);
        container.appendChild(buttonExit);
        modal.appendChild(container);
        document.body.appendChild(modal);
    } else {
        alert('Sem classificação, jogue uma partida!');
    }
}

export function modalFinishedGame() {
    const playerName = JSON.parse(localStorage.getItem('playerList')) || [];
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#0a0146';
    modalContent.style.padding = '20px';
    modalContent.style.width = '100%';
    modalContent.style.height = '350px';
    modal.appendChild(modalContent);

    const h1 = document.createElement('h1');
    h1.textContent = `Parabéns ${playerName[playerName.length - 1].name}! Seu tempo foi de ${playerName[playerName.length - 1].time}.`;
    h1.style.color = 'white';
    h1.style.textAlign = 'center';
    h1.style.marginBottom = '20px';
    modalContent.appendChild(h1);

    const containerButton = document.createElement('div');
    containerButton.style.display = 'flex';
    containerButton.style.justifyContent = 'center';
    containerButton.style.gap = '10px';
    modalContent.appendChild(containerButton);

    const buttonChangeUser = document.createElement('button');
    buttonChangeUser.classList.add('style-button-modal');
    buttonChangeUser.textContent = 'Trocar Jogador';
    
    buttonChangeUser.addEventListener('click', () => {
        playerInformation()
        modal.remove();
    });
    containerButton.appendChild(buttonChangeUser)

    const buttonPlayAgain = document.createElement('button');
    buttonPlayAgain.classList.add('style-button-modal');
    buttonPlayAgain.textContent = 'Jogar Novamente';
    
    buttonPlayAgain.addEventListener('click', () => {
        modal.remove();
        resetGame()
        startGame()
    })
    containerButton.appendChild(buttonPlayAgain);

    const game = document.querySelector('.game');
    if (game) {
        game.appendChild(modal);
    }
}