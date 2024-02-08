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

    function mostrarNotificacion(message) {
        Toastify({
            text: message,
            duration: 99999999, // Duración en milisegundos
            close: true, // Opcional: botón de cerrar la notificación
            gravity: "top", // Opcional: posición de la notificación (top, bottom, left, right)
            position: "center", // Opcional: alineación horizontal de la notificación (left, center, right)
            stopOnFocus: true, // Opcional: detener el temporizador de la notificación cuando el usuario enfoque la ventana
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            offset: {
                x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 150 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
        }).showToast();
    }
    
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
            attempts++; // Suma un intento
            
            if (userGuess === randomNumber) {
                gameWon++ // Suma una partida ganada
                won.textContent = gameWon;
                /* messageElement.textContent = 'Correcto. ¡Ganaste!.'; */

                mostrarNotificacion("¡Ganaste! El número correcto es " + randomNumber + ".");

                resultElement.innerHTML = '<i class="fa-solid fa-check"></i>';
                arrows.push(`<i class="fa-solid fa-check"></i>`); // Agrega el ckeck de que la respuesta es correcta

                guessForm.querySelector('input[type="number"]').disabled = true; // Deshabilita el campo de entrada después de ganar
                guessForm.querySelector('button[type="submit"]').style.display = 'none'; // Oculta el botón de "Adivinar"
            } else if (userGuess > randomNumber) {
                resultElement.innerHTML = `<i class="fa-solid fa-arrow-down"></i>`;
                arrows.push(`<i class="fa-solid fa-arrow-down"></i>`);
            } else {
                resultElement.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
                arrows.push(`<i class="fa-solid fa-arrow-up"></i>`);
            }
            
            resultElement.innerHTML = arrows.join('<div class="arrows-space"></div>'); // Mostrar las flechas

            failedGuesses.push(userGuess); // Agregar el número fallido al array
            failedGuessesElement.innerHTML = failedGuesses.map(char => `<div class="numbers-space">${char < 10 ? '0' + char : char}</div>`).join('');
 // Mostrar los números fallidos
    
            if (attempts === 5 && userGuess !== randomNumber) {
                gameLost++ // Suma una partida perdida
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