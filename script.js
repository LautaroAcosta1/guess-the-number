// Generar un número aleatorio al cargar la página
let randomNumber = Math.floor(Math.random() * 100);

// Obtener referencia al formulario, campo de entrada, botón de reinicio y elemento de resultado
const guessForm = document.getElementById('guessForm');
const resultElement = document.getElementById('result');
let attempts = 0; // Contador de intentos

// Manejar la presentación de resultados cuando se envía el formulario
guessForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    
    const userGuess = parseInt(guessForm.querySelector('input[type="number"]').value);
    
    if (attempts < 5) {
        attempts++;
        
        if (userGuess === randomNumber) {
            resultElement.textContent = 'Correcto. ¡Ganaste!.';
            guessForm.querySelector('input[type="number"]').disabled = true;
        } else if (userGuess > randomNumber) {
            resultElement.textContent = `El número es más bajo. Intentos restantes: ${5 - attempts}`;
        } else {
            resultElement.textContent = `El número es más alto. Intentos restantes: ${5 - attempts}`;
        }

        if (attempts === 5 && userGuess !== randomNumber) {
            resultElement.textContent = `¡Lo siento! Has agotado tus 5 intentos. El número correcto era ${randomNumber}. ¡Perdiste!`;
            guessForm.querySelector('input[type="number"]').disabled = true; // Deshabilita el campo de entrada después de 5 intentos
        }
    }
});


console.log(randomNumber)