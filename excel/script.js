// Seleciona a div pelo seu ID
const excelBs = document.getElementById('xb');
const excelAv = document.getElementById('xa');

// Adiciona um evento de clique à div
excelBs.addEventListener('click', function() {
    window.location.href = './fx/fix-bs.html';
});
excelAv.addEventListener('click', function() {
    window.location.href = './fx/fix-av.html';
});


document.getElementById('textBox1').addEventListener('click', function() {
    this.querySelector('h2').textContent = "BLOQUEADO";
});
document.getElementById('textBox2').addEventListener('click', function() {
    this.querySelector('h2').textContent = "BLOQUEADO";
});
