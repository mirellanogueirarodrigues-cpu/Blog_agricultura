// --- CAÇA-PALAVRAS ---
const matrix = [
  ['S', 'O', 'J', 'A', 'X', 'M', 'I', 'L', 'H', 'O'],
  ['T', 'R', 'I', 'G', 'O', 'A', 'R', 'A', 'D', 'O'],
  ['A', 'D', 'U', 'B', 'O', 'K', 'T', 'Z', 'W', 'Q'],
  ['C', 'A', 'F', 'E', 'L', 'P', 'R', 'O', 'J', 'T'],
  ['S', 'A', 'F', 'R', 'A', 'O', 'A', 'M', 'P', 'R'],
  ['A', 'R', 'R', 'O', 'Z', 'S', 'T', 'K', 'L', 'A'],
  ['H', 'O', 'R', 'T', 'A', 'X', 'O', 'Y', 'Z', 'T'],
  ['T', 'R', 'A', 'T', 'O', 'R', 'Q', 'W', 'E', 'R'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
];

const targetWords = ["SOJA", "MILHO", "TRIGO", "CAFE", "ARROZ", "TRATOR", "ADUBO", "ARADO", "SAFRA", "HORTA"];
let selectedSequence = "";
let foundWords = [];

function initWordSearch() {
  const grid = document.getElementById('wordsearch-grid');
  grid.innerHTML = '';
  
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = matrix[r][c];
      cell.addEventListener('click', () => selectCell(cell, matrix[r][c]));
      grid.appendChild(cell);
    }
  }
}

function selectCell(cell, char) {
  if (!cell.classList.contains('selected')) {
    cell.classList.add('selected');
    selectedSequence += char;
    verificarPalavras();
  }
}

function limparSelecao() {
  selectedSequence = "";
  const cells = document.querySelectorAll('.cell');
  cells.forEach(c => c.classList.remove('selected'));
}

function verificarPalavras() {
  targetWords.forEach(word => {
    if (selectedSequence.includes(word) && !foundWords.includes(word)) {
      foundWords.push(word);
      const tag = document.getElementById(`w-${word}`);
      if (tag) {
        tag.classList.add('found');
      }
    }
  });

  if (foundWords.length === targetWords.length) {
    setTimeout(() => {
      alert("Parabéns! Você encontrou todas as 10 palavras do campo! 🌾🎉");
    }, 200);
  }
}

// --- CRUZADINHA ---
function verificarCruzadinha() {
  const ans1 = document.getElementById('cross-1').value.trim().toLowerCase();
  const ans2 = document.getElementById('cross-2').value.trim().toLowerCase();
  const ans3 = document.getElementById('cross-3').value.trim().toLowerCase();
  const ans4 = document.getElementById('cross-4').value.trim().toLowerCase();

  let acertos = 0;

  if (ans1 === 'hidroponia') acertos++;
  if (ans2 === 'brasil') acertos++;
  if (ans3 === 'trator') acertos++;
  if (ans4 === 'safra') acertos++;

  const result = document.getElementById('cross-result');
  if (acertos === 4) {
    result.style.color = '#4a7c59';
    result.innerText = "✨ Incrível! Você gabaritou a cruzadinha!";
  } else {
    result.style.color = '#d96b43';
    result.innerText = `Você acertou ${acertos} de 4 palavras. Dê mais uma olhadinha nas dicas!`;
  }
}

// --- QUIZ ---
function calcularQuiz() {
  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2 = document.querySelector('input[name="q2"]:checked');
  const q3 = document.querySelector('input[name="q3"]:checked');

  if (!q1 || !q2 || !q3) {
    const result = document.getElementById('quiz-result');
    result.style.color = '#d96b43';
    result.innerText = "Por favor, responda todas as 3 perguntas antes de enviar!";
    return;
  }

  let score = 0;
  if (q1.value === 'b') score++;
  if (q2.value === 'c') score++;
  if (q3.value === 'a') score++;

  const result = document.getElementById('quiz-result');
  if (score === 3) {
    result.style.color = '#4a7c59';
    result.innerText = "🌟 Sensacional! 3/3 acertos! Você sabe tudo de agricultura!";
  } else {
    result.style.color = '#d96b43';
    result.innerText = `Você acertou ${score} de 3 perguntas. Continue explorando o blog!`;
  }
}

// Inicializar na carga do documento
window.onload = () => {
  initWordSearch();
};