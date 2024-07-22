const words = [
    "amizade", "alegria", "amor", "aprendizado", "aventura", "beleza", "bondade", "brincadeira", "café", "calma",
    "carinho", "casa", "céu", "chuva", "coragem", "criatividade", "cuidado", "dança", "dedicação", "desejo", 
    "diversão", "doce", "educação", "energia", "esperança", "estudo", "família", "felicidade", "festa", "flor", 
    "força", "fraternidade", "futuro", "garra", "gentileza", "gratidão", "harmonia", "honra", "honestidade", 
    "imaginação", "independência", "inspiração", "inteligência", "jogo", "justiça", "liberdade", "luz", "magia", 
    "mar", "memória", "mente", "música", "natureza", "paz", "persistência", "prazer", "respeito", "Vem", 
    "riso", "sabedoria", "saúde", "serenidade", "sonho", "sucesso", "surpresa", "talento", "garrafa", "trabalho", 
    "transformação", "união", "vida", "vitória", "voz", "vontade", "amizade", "amor", "animal", "árvore", "arte", 
    "beleza", "bondade", "brincar", "bolo", "brincar", "bola", "calma", "casa", "cachorro", "céu", "chuva", "comida", 
    "cor", "coração", "coragem", "cuidar", "doce", "dia", "descobrir", "dança", "educar", "energia", "escola", 
    "estudar", "fazer", "feliz", "festa", "flor", "futuro", "gato", "gente", "girar", "gargalhada", "grande", "gentil", 
    "gente", "gosto", "harmonia", "honestidade", "imaginação", "inteligente", "ir", "jardim", "jogar", "jogo", "justiça", 
    "legal", "ler", "luz", "lago", "magia", "mar", "melodia", "nadar", "natureza", "olhar", "ouvir", "paz", "pular", 
    "pintar", "pintar", "pensar", "persistir", "prazer", "plantar", "quebrar", "resolver", "riso", "saber", "sabedoria", 
    "sorrir", "sonho", "sentir", "ser", "tocar", "tranquilidade", "trabalhar", "unir", "ver", "vida", "vitória", "viajar", 
    "voar", "vontade", "amizade", "alegria", "amor", "aprender", "aventura", "abraço", "azul", "abraço", "amarelo", 
    "beleza", "brincar", "cantar", "casa", "calma", "chuva", "correr", "carinho", "contar", "correr", "conhecer", 
    "cuidar", "criar", "dançar", "ensinar", "escutar", "estudar", "festa", "flor", "brincar", "gargalhar", "girar", 
    "gostar", "ajudar", "imaginar", "jogar", "ler", "lutar", "nadar", "ouvir", "plantar", "pintar", "pular", "querer", 
    "rir", "sonhar", "ser", "tocar", "unir", "ver", "voar", "viver", "vencer", "viajar", "valor", "amizade", "alegria", 
    "amor", "aprender", "aventura", "abraço", "azul", "abraço", "amarelo", "beleza", "brincar", "cantar", "casa", "calma", 
    "chuva", "correr", "carinho", "contar", "correr", "conhecer", "cuidar", "criar", "dançar", "ensinar", "escutar", 
    "estudar", "festa", "flor", "brincar", "gargalhar", "girar", "gostar", "ajudar", "imaginar", "jogar", "ler", "lutar", 
    "nadar", "ouvir", "plantar", "pintar", "pular", "querer", "rir", "sonhar", "ser", "tocar", "unir", "Oxi", "Wanderson", "Mateus", "dos", "Santos", "Santana", "TSI","Cauê", "Kayron","Davi", "Ronald"
// Adicione as outras palavras aqui, até 500
];

let currentWord = "";
let score = 0;
let level = 1;
let goal = 10; // Pontuação objetivo para passar de nível
let wordsTyped = 0;
let maxWords = 10; // Máximo de palavras por nível
let timeLimit = 80; // Tempo limite inicial em segundos
const minTimeLimit = 45 ; // Tempo limite mínimo em segundos
let timer;
let gameActive = false;
let timeRemaining = timeLimit;

const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const goalDisplay = document.getElementById("goal");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function startGame() {
    if (!gameActive) {
        gameActive = true;
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
    timerDisplay.innerText = `Tempo: ${timeRemaining}s`;
    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = `Tempo: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'O tempo acabou! Reiniciando o nível...',
                footer: '<a href="./dicas.html">Quero dicas para digitar melhor/rápido!</a>'
            });
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
    scoreDisplay.innerText = `${score}`;
    if (wordsTyped >= maxWords) {
        levelUp();
    } else {
        currentWord = getRandomWord();
        displayWord(currentWord);
    }
}

function levelUp() {
    level++;
    goal += 10; // Aumenta a pontuação objetivo para o próximo nível
    wordsTyped = 0; // Resetar contador de palavras
    timeLimit -= 5; // Reduz o tempo limite em 5 segundos por nível (opcional, para aumentar a dificuldade)
    timeLimit = Math.max(timeLimit, minTimeLimit); // Garante que o tempo limite não fique abaixo de 50 segundos
    levelDisplay.innerText = `${level}`; // Nível
    goalDisplay.innerText = `${goal} pontos`; // Próximo Nível
    clearInterval(timer); // Pausa o temporizador
    Swal.fire({
        icon: 'success',
        title: `Parabéns! Você alcançou o nível ${level}. Continue assim!`,
    }).then(() => {
        currentWord = getRandomWord();
        displayWord(currentWord);
        wordInput.value = "";
        timeRemaining = timeLimit; // Reinicia o temporizador para o novo nível
        startTimer(); // Retoma o temporizador
    });
}

function resetGame() {
    clearInterval(timer); // Garante que o temporizador anterior seja limpo
    score = 0;
    level = 1;
    goal = 10;
    wordsTyped = 0;
    timeLimit = 90; // Reiniciando o tempo para 90 segundos após cada jogo completo
    timeRemaining = timeLimit; // Reinicia o tempo restante
    scoreDisplay.innerText = `${score}`; // Pontuação
    levelDisplay.innerText = `${level}`; // Nível
    goalDisplay.innerText = `${goal} pontos`; // Próximo Nível
    timerDisplay.innerText = `Tempo: ${timeLimit}s`;
    gameActive = false;
}

wordInput.addEventListener("input", () => {
    if (gameActive) {
        const typedWord = wordInput.value.trim(); // Remove espaços em branco no início e fim
        const currentWordArray = currentWord.split("");
        const typedWordArray = typedWord.split("");

        currentWordArray.forEach((letter, index) => {
            const span = wordDisplay.children[index];
            if (!span) return;
            const typedLetter = typedWordArray[index];
            if (typedLetter === letter) {
                span.classList.add("correct");
            } else {
                span.classList.remove("correct");
            }
        });

        if (typedWord === currentWord) {
            updateScore();
            wordInput.value = "";
        }
    }
});

startButton.addEventListener("click", () => {
    if (!gameActive) {
        startGame();
    } else {
        startTimer();
    }
});
pauseButton.addEventListener("click", pauseGame);
