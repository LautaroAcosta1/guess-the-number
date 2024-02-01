// Generar un número aleatorio al cargar la página
let randomNumber = Math.floor(Math.random() * 100);

// Obtener referencia al formulario, campo de entrada y elemento de resultado
const guessForm = document.getElementById('guessForm');
const resultElement = document.getElementById('arrows');
const messageElement = document.getElementById('message');
const repeatedNumber = document.getElementById('repeated')
const failedGuessesElement = document.getElementById('failedAttempt'); // Nuevo elemento para mostrar números fallidos
const resetButton = document.getElementById('resetButton');
const won = document.getElementById('won');
const lost = document.getElementById('lost');

let attempts = 0; // Contador de intentos
let failedGuesses = []; // Array para almacenar números fallidos
let arrows = []; // Array para almacenar las flechas
let gameWon = 0;
let gameLost = 0;

guessForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    
    const userGuess = parseInt(guessForm.querySelector('input[type="number"]').value);
    
    if (failedGuesses.includes(userGuess)) {
        repeatedNumber.textContent = 'Ya has intentado ese número. Por favor, intenta con otro.';

        // Mostrar el mensaje durante 3 segundos y luego ocultarlo
        setTimeout(function() {
            repeatedNumber.textContent = ''; // Vaciar el contenido del mensaje
        }, 3000); // 3000 milisegundos = 3 segundos

    } else {
        // Procesar el intento del usuario normalmente
        if (attempts < 5) {
            attempts++;
            
            if (userGuess === randomNumber) {
                gameWon++
                won.textContent = gameWon;
                messageElement.textContent = 'Correcto. ¡Ganaste!.';
                guessForm.querySelector('input[type="number"]').disabled = true; // Deshabilita el campo de entrada después de ganar.
                guessForm.querySelector('button[type="submit"]').style.display = 'none'; // Oculta el botón de "Adivinar"
            } else if (userGuess > randomNumber) {
                resultElement.innerHTML = `<i class="fa-solid fa-arrow-down"></i>`;
                arrows.push(`<i class="fa-solid fa-arrow-down"></i>`);
            } else {
                resultElement.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
                arrows.push(`<i class="fa-solid fa-arrow-up"></i>`);
            }
            
            resultElement.innerHTML = arrows.join(', '); // Mostrar las flechas.

            failedGuesses.push(userGuess); // Agregar el número fallido al array
            failedGuessesElement.textContent = `Números utilizados: ${failedGuesses.join(', ')}`; // Mostrar los números fallidos
    
            if (attempts === 5 && userGuess !== randomNumber) {
                gameLost++
                lost.textContent = gameLost;
                messageElement.textContent = `¡Lo siento! Has agotado tus 5 intentos. El número correcto era ${randomNumber}. ¡Perdiste!`;
                guessForm.querySelector('input[type="number"]').disabled = true; // Deshabilita el campo de entrada después de 5 intentos
                guessForm.querySelector('button[type="submit"]').style.display = 'none'; // Oculta el botón de "Adivinar"
            }
        }
    }
});


resetButton.addEventListener('click', function() {
    // Restablecer todas las variables y elementos necesarios para comenzar un nuevo juego
    randomNumber = Math.floor(Math.random() * 100);
    attempts = 0;
    failedGuesses = [];
    arrows = [];
    resultElement.innerHTML = '';
    messageElement.textContent = '';
    failedGuessesElement.textContent = '';
    repeatedNumber.textContent = '';
    guessForm.querySelector('input[type="number"]').disabled = false;
    guessForm.querySelector('input[type="number"]').value = '';
    guessForm.querySelector('button[type="submit"]').style.display = 'block';

    console.log('numero de reinicio:', randomNumber)
});


console.log('numero de primer intento:',randomNumber)