document.getElementById('textBox1').addEventListener('click', function() {
    this.querySelector('h3').textContent = "BLOQUEADO";
});
document.getElementById('textBox2').addEventListener('click', function() {
    this.querySelector('h3').textContent = "BLOQUEADO";
});
document.getElementById('textBox3').addEventListener('click', function() {
    this.querySelector('h3').textContent = "BLOQUEADO";
});



// Seleciona a div pelo seu ID
const clickableDiv = document.getElementById('excel');

// Adiciona um evento de clique à div
clickableDiv.addEventListener('click', function() {
    // Redireciona para outra página
    window.location.href = './excel/excel-home.html';
});
