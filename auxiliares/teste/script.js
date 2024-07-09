const words = [
    "*"
    // Adicione as outras palavras aqui, até 500
];

let currentWord = "";
let score = 0;
let level = 1;
let goal = 10; // Pontuação objetivo para passar de nível
let wordsTyped = 0;
let maxWords = 10; // Máximo de palavras por nível
let timeLimit = 10; // Tempo limite inicial em segundos
const minTimeLimit = 10; // Tempo limite mínimo em segundos
let timer;
let gameActive = false;
let codename = "";

const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const goalDisplay = document.getElementById("goal");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const codenameInput = document.getElementById("codename");
const rankingList = document.getElementById("ranking-list");

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function startGame() {
    codename = codenameInput.value.trim();
    if (!codename) {
        alert("Por favor, digite um codinome para começar.");
        return;
    }

    if (!gameActive) {
        gameActive = true;
        timeLimit = Math.max(timeLimit, minTimeLimit); // Garante que o tempo limite seja no mínimo 30 segundos
        currentWord = getRandomWord();
        displayWord(currentWord);
        wordInput.value = "";
        wordInput.focus();
        startTimer();
    }
}

function displayWord(word) {
    const wordArray = word.split("");
    wordDisplay.innerHTML = "";
    wordArray.forEach((letter) => {
        const span = document.createElement("span");
        span.innerText = letter;
        wordDisplay.appendChild(span);
    });
}

function startTimer() {
    clearInterval(timer);
    let timeRemaining = timeLimit;
    timerDisplay.innerText = `Tempo: ${timeRemaining}s`;
    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = `Tempo: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert("O tempo acabou! Reiniciando o nível...");
            saveScore();
            resetGame();
        }
    }, 1000);
}

function pauseGame() {
    clearInterval(timer);
    gameActive = false;
}

function updateScore() {
    score++;
    wordsTyped++;
    scoreDisplay.innerText = `Pontuação: ${score}`;
    if (wordsTyped >= maxWords) {
        levelUp();
    }
}

function levelUp() {
    level++;
    goal += 10; // Aumenta a pontuação objetivo para o próximo nível
    wordsTyped = 0; // Resetar contador de palavras
    timeLimit -= 5; // Reduz o tempo limite em 5 segundos por nível (opcional, para aumentar a dificuldade)
    timeLimit = Math.max(timeLimit, minTimeLimit); // Garante que o tempo limite não fique abaixo de 30 segundos
    levelDisplay.innerText = `Nível: ${level}`;
    goalDisplay.innerText = `Próximo Nível: ${goal} pontos`;
    alert(`Parabéns! Você alcançou o nível ${level}. Continue assim!`);
    currentWord = getRandomWord();
    displayWord(currentWord);
    startTimer();
}

function resetGame() {
    score = 0;
    level = 1;
    goal = 10;
    wordsTyped = 0;
    timeLimit = 90; // Reiniciando o tempo para 90 segundos após cada jogo completo
    scoreDisplay.innerText = `Pontuação: ${score}`;
    levelDisplay.innerText = `Nível: ${level}`;
    goalDisplay.innerText = `Próximo Nível: ${goal} pontos`;
    timerDisplay.innerText = `Tempo: ${timeLimit}s`;
    gameActive = false;
}

function saveScore() {
    const playerData = {
        codename: codename,
        level: level
    };

    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    ranking.push(playerData);
    ranking.sort((a, b) => b.level - a.level); // Ordena por nível em ordem decrescente
    ranking = ranking.slice(0, 3); // Mantém apenas os top 3
    localStorage.setItem("ranking", JSON.stringify(ranking));

    displayRanking();
}

function displayRanking() {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    rankingList.innerHTML = "";
    ranking.forEach((player, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${player.codename} - Nível: ${player.level}`;
        rankingList.appendChild(listItem);
    });
}

wordInput.addEventListener("input", () => {
    if (gameActive) {
        const typedWord = wordInput.value;
        const currentWordArray = currentWord.split("");
        const typedWordArray = typedWord.split("");

        currentWordArray.forEach((letter, index) => {
            const span = wordDisplay.children[index];
            if (!span) return;
            const typedLetter = typedWordArray[index];
            if (typedLetter === letter) {
                span.classList.remove("incorrect");
                span.classList.add("correct");
            } else {
                span.classList.remove("correct");
                span.classList.add("incorrect");
            }
        });

        if (typedWord === currentWord) {
            updateScore();
            wordInput.value = "";
            if (wordsTyped < maxWords) {
                currentWord = getRandomWord();
                displayWord(currentWord);
            } else {
                levelUp();
            }
        }
    }
});

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", pauseGame);

window.onload = displayRanking;
