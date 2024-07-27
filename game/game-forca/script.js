const themes = {
    animals: [
        "cachorro", "gato", "elefante", "girafa", "tigre",
        "leão", "urso", "zebra", "cavalo", "coelho",
        "rato", "hamster", "canguru", "panda", "rinoceronte",
        "hipopótamo", "lobo", "raposa", "jaguatirica",
        "búfalo", "camelo","gambá", "hiena", "jiboia", "jumento", "javali",
        "leopardo", "lontra", "macaco", "morcego", "onça", "orangotango", "paca", "pantera",
        "pinguim", "porco", "quati", "tamanduá", "toupeira", "tucano"
    ],
    fruits: [
        "banana", "maçã", "uva", "laranja", "abacaxi",
        "manga", "morango", "melancia", "melão", "kiwi",
        "limão", "cereja", "pêssego", "pera", "ameixa",
        "abacate", "caju", "framboesa", "mirtilo", "amora",
        "goiaba", "maracujá", "mamão", "figo", "carambola",
        "pitanga", "caqui", "jabuticaba", "acerola",
        "graviola", "tangerina", "lima", "roma", "pinha",
        "lichia", "cupuaçu", "seriguela", "umbu",
        "jaca", "sapoti", "buriti", "camapu", "bacaba",
        "baru", "jenipapo", "mangaba", "taperebá", "pitaya"
    ],
    birds: [
        "pardal", "canário", "papagaio", "arara", "periquito",
        "calopsita", "pombo", "coruja", "águia", "falcão",
        "tucano", "beija-flor", "pavão", "cisne", "flamingo",
        "galinha", "galo", "pato", "marreco", "garça",
        "pelicano", "albatroz", "gaivota", "corvo", "andorinha",
        "rouxinol", "tordo", "cotovia", "saracura",
        "sanhaço", "sabiá", "cigarra", "perdiz",
        "gavião", "trinca-ferro", "pintassilgo", "mutum",
        "uru", "jacutinga", "aracuã", "xexéu", "curió",
        "garibaldi", "saíra", "juruviara", "suiriri",
    ],
    countries: [
        "Brasil", "Argentina", "Chile", "Colômbia", "México",
        "Canadá", "Alemanha", "França", "Itália",
        "Espanha", "Portugal", "Inglaterra", "Escócia", "Irlanda",
        "Suíça", "Áustria", "Bélgica", "Holanda", "Dinamarca",
        "Suécia", "Noruega", "Finlândia", "Rússia", "China",
        "Japão", "Coreia", "Índia", "Austrália",
        "Egito", "África", "Marrocos", "Nigéria", "Quênia",
        "Gana", "Senegal", "Tunísia", "Angola", "Moçambique",
        "Zâmbia", "Zimbábue", "Malásia", "Singapura", "Indonésia",
        "Filipinas", "Tailândia", "Vietnã", "Camboja", "Nepal"
    ],
    names: [
        "Ana", "Pedro", "João", "Maria", "Lucas",
        "Julia", "Carlos", "Mariana", "Gabriel", "Rafael",
        "Beatriz", "Matheus", "Bruna", "Felipe", "Aline",
        "Tiago", "Amanda", "Diego", "Patricia", "Igor",
        "Carla", "Rodrigo", "Fernanda", "Vinicius", "Laura",
        "Ricardo", "Renata", "Luiz", "Livia", "Daniel",
        "Paula", "Rogério", "Elisa", "Gustavo", "Larissa",
        "Eduardo", "Leticia", "Henrique", "Natalia", "Leandro",
        "Camila", "Claudia", "Mauricio", "Monica", "André",
        "Sabrina", "Marcio", "Débora", "Bruno", "Luciana"
    ]
};

let selectedTheme = "animals";
let selectedWord = themes[selectedTheme][Math.floor(Math.random() * themes[selectedTheme].length)];
let guessedLetters = [];
let wrongGuesses = 0;

const wordContainer = document.getElementById("word");
const keyboardContainer = document.getElementById("keyboard");
const resetButton = document.getElementById("reset");
const hangmanCanvas = document.getElementById("hangmanCanvas");
const ctx = hangmanCanvas.getContext("2d");
const themeSelect = document.getElementById("theme-select");

themeSelect.addEventListener("change", (e) => {
    selectedTheme = e.target.value;
    initializeGame();
});

function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function drawHangman() {
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';

    if (wrongGuesses > 0) { // Base
        ctx.beginPath();
        ctx.moveTo(10, 190);
        ctx.lineTo(190, 190);
        ctx.stroke();
    }
    if (wrongGuesses > 1) { // Pole
        ctx.beginPath();
        ctx.moveTo(50, 190);
        ctx.lineTo(50, 10);
        ctx.stroke();
    }
    if (wrongGuesses > 2) { // Beam
        ctx.beginPath();
        ctx.moveTo(50, 10);
        ctx.lineTo(150, 10);
        ctx.stroke();
    }
    if (wrongGuesses > 3) { // Rope
        ctx.beginPath();
        ctx.moveTo(150, 10);
        ctx.lineTo(150, 30);
        ctx.stroke();
    }
    if (wrongGuesses > 4) { // Head
        ctx.beginPath();
        ctx.arc(150, 50, 20, 0, Math.PI * 2, true);
        ctx.stroke();
    }
    if (wrongGuesses > 5) { // Body
        ctx.beginPath();
        ctx.moveTo(150, 70);
        ctx.lineTo(150, 130);
        ctx.stroke();
    }
    if (wrongGuesses > 6) { // Left Arm
        ctx.beginPath();
        ctx.moveTo(150, 90);
        ctx.lineTo(120, 110);
        ctx.stroke();
    }
    if (wrongGuesses > 7) { // Right Arm
        ctx.beginPath();
        ctx.moveTo(150, 90);
        ctx.lineTo(180, 110);
        ctx.stroke();
    }
    if (wrongGuesses > 8) { // Left Leg
        ctx.beginPath();
        ctx.moveTo(150, 130);
        ctx.lineTo(120, 160);
        ctx.stroke();
    }
    if (wrongGuesses > 9) { // Right Leg
        ctx.beginPath();
        ctx.moveTo(150, 130);
        ctx.lineTo(180, 160);
        ctx.stroke();
    }
}

function initializeGame() {
    guessedLetters = [];
    wrongGuesses = 0;
    selectedWord = themes[selectedTheme][Math.floor(Math.random() * themes[selectedTheme].length)];
    wordContainer.innerHTML = selectedWord.split("").map(letter => "_").join(" ");
    drawHangman();
    createKeyboard();
}

function createKeyboard() {
    keyboardContainer.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const button = document.createElement("button");
        button.classList.add("letter");
        button.textContent = letter;
        button.onclick = () => guessLetter(letter);
        keyboardContainer.appendChild(button);
    }
}

function guessLetter(letter) {
    guessedLetters.push(letter);
    const letters = document.querySelectorAll(".letter");
    letters.forEach(btn => {
        if (btn.textContent === letter) {
            btn.disabled = true;
        }
    });

    if (normalize(selectedWord).includes(letter)) {
        updateWord();
    } else {
        wrongGuesses++;
        drawHangman();
    }

    checkGameStatus();
}

function updateWord() {
    const displayedWord = selectedWord.split("").map(letter => guessedLetters.includes(normalize(letter)) ? letter : "_").join(" ");
    wordContainer.textContent = displayedWord;
}

function checkGameStatus() {
    if (!wordContainer.textContent.includes("_")) {
        setTimeout(() => {
            Swal.fire({
                title: 'Parabéns!',
                text: 'Você ganhou!',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        }, 100);
    } else if (wrongGuesses >= 10) {
        setTimeout(() => {
            Swal.fire({
                title: 'Você perdeu!',
                text: `A palavra era ${selectedWord}.`,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }, 100);
    }
}

resetButton.addEventListener("click", initializeGame);

initializeGame();
