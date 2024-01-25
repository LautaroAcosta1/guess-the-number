// Generar un número aleatorio al cargar la página
let randomNumber = Math.floor(Math.random() * 100);

// Obtener referencia al formulario, campo de entrada, botón de reinicio y elemento de resultado
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const resultElement = document.getElementById('result');
const resetButton = document.getElementById('resetButton');

// Manejar la presentación de resultados cuando se envía el formulario
guessForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    
    const userGuess = parseInt(guessInput.value);
    
    if (userGuess === randomNumber) {
        resultElement.textContent = '¡Felicidades! ¡Has adivinado el número correctamente!';
    } else {
        resultElement.textContent = `Lo siento, el número correcto era ${randomNumber}. ¡Inténtalo de nuevo!`;
    }
});

// Función para reiniciar el juego
function reiniciarJuego() {
    // Generar un nuevo número aleatorio
    randomNumber = Math.floor(Math.random() * 100);
    // Limpiar el resultado anterior
    resultElement.textContent = '';
    // Limpiar el campo de entrada
    guessInput.value = '';
}

// Manejar el clic en el botón "Volver a Jugar"
resetButton.addEventListener('click', function() {
    reiniciarJuego();
});

console.log(randomNumber)