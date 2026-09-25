// Tasa de cambio de ejemplo (Ej: 1 USD = 1500 Pesos)
const EXCHANGE_RATE = 1500;

// Referencias a los elementos del DOM
const noteTitleInput = document.getElementById('note-title');
const noteAmountInput = document.getElementById('note-amount');
const convertedPreview = document.getElementById('converted-preview');
const btnAdd = document.getElementById('btn-add');
const notesGrid = document.getElementById('notes-grid');

// Función para actualizar la vista previa calculada
function updatePreview() {
  const amount = parseFloat(noteAmountInput.value);
  
  if (!isNaN(amount) && amount > 0) {
    const usdValue = Math.round(amount / EXCHANGE_RATE);
    convertedPreview.textContent = `${usdValue} U$S`;
  } else {
    convertedPreview.textContent = '13 U$S';
  }
}

// Escuchar cambios en el input del monto
noteAmountInput.addEventListener('input', updatePreview);

// Función para agregar una notita nueva
function addNote() {
  const titleText = noteTitleInput.value.trim();
  const amountValue = parseFloat(noteAmountInput.value);

  if (!titleText) {
    alert('Por favor, ingresa el nombre de la notita.');
    return;
  }

  // Crear la tarjeta de notita
  const card = document.createElement('div');
  card.classList.add('note-card');

  // Si no se ingresó monto, crear tarjeta ancha (tipo gris)
  if (isNaN(amountValue) || amountValue <= 0) {
    card.classList.add('card-gray', 'wide-card');
    card.innerHTML = `
      <span class="delete-btn">&times;</span>
      <h3>${titleText}</h3>
    `;
  } else {
    // Si tiene monto, calcular conversión y usar borde azul/celeste
    const usdValue = Math.round(amountValue / EXCHANGE_RATE);
    const colorClass = Math.random() > 0.5 ? 'card-blue' : 'card-cyan';
    
    card.classList.add(colorClass);
    card.innerHTML = `
      <span class="delete-btn">&times;</span>
      <h3>${titleText}</h3>
      <p>$${amountValue} = ${usdValue}U$S</p>
    `;
  }

  // Evento para eliminar la nota al presionar la 'X'
  const deleteBtn = card.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => card.remove());

  // Agregar la tarjeta al tablero
  notesGrid.appendChild(card);

  // Limpiar campos del formulario
  noteTitleInput.value = '';
  noteAmountInput.value = '';
  convertedPreview.textContent = '13 U$S';
}

// Asignar evento al botón AGREGAR
btnAdd.addEventListener('click', addNote);

// Permitir borrar las tarjetas que vienen por defecto en el sketch
document.querySelectorAll('.note-card .delete-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.target.parentElement.remove();
  });
});