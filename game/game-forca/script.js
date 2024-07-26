const themes = {
    animals: [
        "cachorro", "gato", "elefante", "girafa", "leão", "tigre", "pato", "cavalo", "pinguim", "urso",
        "macaco", "coelho", "porco", "rato", "ovelha", "cabra", "zebra", "canguru", "galo", "pássaro"
    ],
    moviesAndSeries: [
        "inception", "casablanca", "friends", "moana", "avatar", "joker", "frozen", "titanic", "alien", "shrek",
        "rocky", "avatar", "godfather", "starwars", "batman", "superman", "avengers", "madmax", "jumanji", "nemo"
    ],
    music: [
        "beatles", "beyoncé", "jazz", "pop", "rock", "rap", "reggae", "blues", "edm", "opera",
        "salsa", "country", "disco", "folk", "samba", "metal", "ballad", "choir", "guitar", "piano"
    ],
    geography: [
        "brasil", "paris", "everest", "nilo", "londres", "roma", "tokyo", "nairobi", "moscow", "berlim",
        "lima", "madrid", "beijing", "sydney", "dubai", "miami", "rio", "lima", "havai", "canada"
    ],
    sports: [
        "futebol", "basketball", "críquete", "golfe", "hóquei", "judô", "karatê", "maratona", "natação", "rugby",
        "skate", "vôlei", "tenis", "surf", "esgrima", "pólo", "patinação", "badminton", "boliche", "yoga"
    ],
    history: [
        "roma", "revolução", "napoleão", "egito", "frança", "grecia", "invasão", "império", "viking", "cruzadas",
        "dinastia", "egito", "guerra", "holocausto", "imperialismo", "renascimento", "reforma", "sumer", "templário", "vitoria"
    ],
    technology: [
        "apple", "smartphone", "github", "android", "cloud", "data", "internet", "java", "hardware", "software",
        "laptop", "malware", "network", "python", "robot", "server", "tablet", "wifi", "zoom", "email", "website"
    ],
    literature: [
        "hamlet", "tolkien", "frodo", "austen", "bronte", "dickens", "shakespeare", "joyce", "poe", "orwell",
        "homer", "twain", "doyle", "james", "wilde", "moliere", "swift", "austen", "huxley", "salinger"
    ],
    culinary: [
        "sushi", "chocolate", "pasta", "pizza", "hamburger", "salada", "sopa", "omelete", "lasagna", "tacos",
        "ramen", "curry", "burrito", "steak", "sushi", "quiche", "samosa", "nachos", "paella", "waffles"
    ],
    nature: [
        "orquídea", "aurora", "petróleo", "floresta", "deserto", "praia", "montanha", "rio", "lago", "caverna",
        "veludo", "planície", "vulcão", "neve", "flor", "árvore", "ocean", "campo", "cachoeira", "praia", "deserto"
    ],
    science: [
        "hidrogênio", "saturno", "átomo", "dna", "energia", "fóton", "genética", "hormônio", "laser", "matéria",
        "neutrino", "óptica", "plutão", "quark", "radiação", "síntese", "vacina", "xenon", "célula", "gravidade"
    ],
    popCulture: [
        "batman", "joker", "mario", "avengers", "breakingbad", "gandalf", "homer", "ironman", "katniss", "leia",
        "morpheus", "neo", "pikachu", "rick", "scooby", "thor", "yoda", "zelda", "spock", "harrypotter"
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

    if (selectedWord.includes(letter)) {
        updateWord();
    } else {
        wrongGuesses++;
        drawHangman();
    }

    checkGameStatus();
}

function updateWord() {
    const displayedWord = selectedWord.split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
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
