// Seleciona a div pelo seu ID
const clickableDivExc = document.getElementById('excel');
const clickableDivInt = document.getElementById('introducao');
const clickableDivTxt = document.getElementById('textos');

// Adiciona um evento de clique à div
clickableDivInt.addEventListener('click', function() {
    window.location.href = './apostila/apostila-home.html';
});
clickableDivExc.addEventListener('click', function() {
    window.location.href = './excel/excel-home.html';
});
clickableDivTxt.addEventListener('click', function() {
    window.location.href = './digitacao/digitacao-home.html';
});
