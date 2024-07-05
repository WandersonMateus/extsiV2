// Seleciona a div pelo seu ID
const clickableDivPwp = document.getElementById('pwp');
const clickableDivPwb = document.getElementById('pwb');
const clickableDivWrd = document.getElementById('wrd');
const clickableDivExl = document.getElementById('exl');
const clickableDivWnd = document.getElementById('wnd');
const clickableDivTst = document.getElementById('tst');

// Adiciona um evento de clique à div
clickableDivPwp.addEventListener('click', function() {
    window.location.href = 'https://drive.google.com/drive/folders/16sSFFiEBPa4eX7Ht6KucWDROcooAJAML?usp=sharing';
});
clickableDivPwb.addEventListener('click', function() {
    window.location.href = 'https://drive.google.com/drive/folders/1Jf9s7o3x7InDfYEcsx9Z68_bAgLvsZuO?usp=sharing';
});
clickableDivWrd.addEventListener('click', function() {
    window.location.href = 'https://drive.google.com/drive/folders/1orTIIsklzm4lXEiI6DgZE0_YEYfMr6G6?usp=sharing';
});
clickableDivExl.addEventListener('click', function() {
    window.location.href = 'https://drive.google.com/drive/folders/1VhTV9ai9oc5mEQjhWFdhlYwVIKAHRy2a?usp=sharing';
});
clickableDivWnd.addEventListener('click', function() {
    window.location.href = 'https://drive.google.com/drive/folders/1auX1teIMz-w93ukfBx3dThOHE0qYT3Jt?usp=sharing';
});
clickableDivTst.addEventListener('click', function() {
    window.location.href = './teste/index.html';
});
