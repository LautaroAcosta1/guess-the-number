// Generar un número aleatorio al cargar la página
let randomNumber = Math.floor(Math.random() * 100);

// Obtener referencia al formulario, campo de entrada y elemento de resultado
const guessForm = document.getElementById('guessForm');
const resultElement = document.getElementById('result');
const failedGuessesElement = document.getElementById('failedAttempt'); // Nuevo elemento para mostrar números fallidos
const resetButton = document.getElementById('resetButton');
let attempts = 0; // Contador de intentos
let failedGuesses = []; // Array para almacenar números fallidos

// Manejar la presentación de resultados cuando se envía el formulario
guessForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    
    const userGuess = parseInt(guessForm.querySelector('input[type="number"]').value);
    
    if (attempts < 5) {
        attempts++;
        
        if (userGuess === randomNumber) {
            resultElement.textContent = 'Correcto. ¡Ganaste!.';
            guessForm.querySelector('input[type="number"]').disabled = true; // Deshabilita el campo de entrada después de ganar.
        } else if (userGuess > randomNumber) {
            resultElement.textContent = `El número es más bajo. Intentos restantes: ${5 - attempts}`;
        } else {
            resultElement.textContent = `El número es más alto. Intentos restantes: ${5 - attempts}`;
        }

        failedGuesses.push(userGuess); // Agregar el número fallido al array
        failedGuessesElement.textContent = `Números utilizados: ${failedGuesses.join(', ')}`; // Mostrar los números fallidos

        if (attempts === 5 && userGuess !== randomNumber) {
            resultElement.textContent = `¡Lo siento! Has agotado tus 5 intentos. El número correcto era ${randomNumber}. ¡Perdiste!`;
            guessForm.querySelector('input[type="number"]').disabled = true; // Deshabilita el campo de entrada después de 5 intentos
        }
    }
});

resetButton.addEventListener(function() {
    console.log("wef")
})



console.log(randomNumber)