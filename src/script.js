
document.getElementById('textBox2').addEventListener('click', function() {
    this.querySelector('h3').textContent = "BLOQUEADO";
});
document.getElementById('textBox3').addEventListener('click', function() {
    this.querySelector('h3').textContent = "BLOQUEADO";
});



// Seleciona a div pelo seu ID
const clickableDivExc = document.getElementById('excel');
const clickableDivInt = document.getElementById('introducao');

// Adiciona um evento de clique à div
clickableDivInt.addEventListener('click', function() {
    window.location.href = './apostila/apostila-home.html';
});
clickableDivExc.addEventListener('click', function() {
    window.location.href = './excel/excel-home.html';
});
