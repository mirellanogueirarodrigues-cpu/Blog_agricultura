// --- CAÇA-PALAVRAS ---
const matrix = [
  ['S', 'O', 'J', 'A', 'X', 'M', 'I', 'L', 'H', 'O'],
  ['T', 'R', 'I', 'G', 'O', 'A', 'R', 'A', 'D', 'O'],
  ['A', 'D', 'U', 'B', 'O', 'K', 'T', 'Z', 'W', 'Q'],
  ['C', 'A', 'F', 'E', 'L', 'P', 'R', 'O', 'J', 'T'],
  ['S', 'A', 'F', 'R', 'A', 'O', 'A', 'M', 'P', 'R'],
  ['A', 'R', 'R', 'O', 'Z', 'S', 'T', 'K', 'L', 'A'],
  ['H', 'O', 'R', 'T', 'A', 'X', 'O', 'Y', 'Z', 'T'],
  ['B', 'N', 'M', 'K', 'L', 'P', 'R', 'Q', 'W', 'O'],
  ['C', 'V', 'B', 'N', 'M', 'L', 'K', 'J', 'H', 'G'],
  ['F', 'D', 'S', 'A', 'Q', 'W', 'E', 'R', 'T', 'Y']
];

const targetWords = ["SOJA", "MILHO", "TRIGO", "ARADO", "ADUBO", "CAFE", "SAFRA", "ARROZ", "HORTA", "TRATOR"];
let selectedCells = [];
let foundWords = [];

function initWordSearch() {
  const grid = document.getElementById('wordsearch-grid');
  grid.innerHTML = '';
  
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = matrix[r][c];
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', () => toggleSelectCell(cell, matrix[r][c]));
      grid.appendChild(cell);
    }
  }
}

let currentSelection = "";

function toggleSelectCell(cell, char) {
  cell.classList.toggle('selected');
  
  // Lógica simples de verificação por palavra ao clicar
  if (cell.classList.contains('selected')) {
    currentSelection += char;
  } else {
    currentSelection = currentSelection.replace(char, '');
  }

  targetWords.forEach(word => {
    if (currentSelection.includes(word) && !foundWords.includes(word)) {
      foundWords.push(word);
      document.getElementById(`w-${word}`).classList.add('found');
    }
  });
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
    result.style.color = '#10b981';
    result.innerText = "Excelente! Você acertou todas as palavras!";
  } else {
    result.style.color = '#ef4444';
    result.innerText = `Você acertou ${acertos} de 4 palavras. Tente novamente!`;
  }
}

// --- QUIZ ---
function calcularQuiz() {
  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2 = document.querySelector('input[name="q2"]:checked');
  const q3 = document.querySelector('input[name="q3"]:checked');

  let score = 0;

  if (q1 && q1.value === 'b') score++;
  if (q2 && q2.value === 'c') score++;
  if (q3 && q3.value === 'a') score++;

  const result = document.getElementById('quiz-result');
  result.style.color = score === 3 ? '#10b981' : '#f59e0b';
  result.innerText = `Sua pontuação: ${score} de 3 perguntas corretas.`;
}

// Inicializar na carga da página
window.onload = () => {
  initWordSearch();
};