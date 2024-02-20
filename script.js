$('#btn-howToPlay').click(function() {
    Swal.fire({
        title: `<span style="color: #fff">¿Comó jugar?</span>`,
        html: `
            <h3 class="sweetAlert-title">Inicio del juego:</h3>
            <p class="sweetAlert-text">Al cargar la página, se generará automáticamente un número aleatorio entre 1 y 100.</p>
            <h3 class="sweetAlert-title">Realizar un intento:</h3>
            <ol class="sweetAlert-text-container">
                <p class="sweetAlert-text">Ingresa un número en el campo de entrada y presiona el botón "Adivinar".</p>
                <p class="sweetAlert-text">Solo se permiten números enteros entre 1 y 100.</p>
                <p class="sweetAlert-text">Tienes un máximo de 5 intentos para adivinar el número correcto.</p>
            </ol>
            <h3 class="sweetAlert-title">Interpretación de pistas:</h3>
            <ol class="sweetAlert-text-container">
                <p class="sweetAlert-text">Después de cada intento, recibirás una pista que te indicará si el número secreto es mayor o menor al número ingresado.</p>
                <p class="sweetAlert-text">Una flecha hacia arriba <i class="fa-solid fa-arrow-up"></i> significa que el número secreto es mayor al que ingresaste.</p>
                <p class="sweetAlert-text">Una flecha hacia abajo <i class="fa-solid fa-arrow-down"></i> significa que el número secreto es menor al que ingresaste.</p>
            </ol>
            <h3 class="sweetAlert-title">Finalización del juego:</h3>
            <ol class="sweetAlert-text-container">
                <p class="sweetAlert-text">Si adivinas el número secreto dentro de los 5 intentos, ¡ganarás la partida!</p>
                <p class="sweetAlert-text">Si agotas tus 5 intentos sin adivinar el número correcto, perderás la partida.</p>
            </ol>
            <h3 class="sweetAlert-title">Reinicio del juego:</h3>
            <p class="sweetAlert-text">Si deseas jugar de nuevo, simplemente haz clic en el botón "Reiniciar" para generar un nuevo número secreto y restablecer tus intentos.</p>
        `,
        background: "#23272F",
        showCloseButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "rgb(255, 102, 0)"
    });
})

$('#btn-statistics').click(function() {
    Swal.fire({
        title: `<span style="color: #fff">Estadisticas</span>`,
        html: `
            <div class="statistics-container">
                <h2 class="statistics">Partidas ganadas:<p id="wonNumber" class="statistics-number"></p></h2>
                <h2 class="statistics">Partidas perdidas:<p id="lostNumber" class="statistics-number"></p></h2>
            </div>
        `,
        background: "#23272F",
        showCloseButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "rgb(255, 102, 0)",
        didOpen: () => {
            // Actualiza el contenido de los elementos al abrir la alerta
            $('#wonNumber').text(gameWon);
            $('#lostNumber').text(gameLost);
        }
    });
})

$('#btn-configuration').click(function() {
    Swal.fire({
        title: `<span style="color: #fff">Configuración</span>`,
        text: "Muy pronto...",
        icon: "warning",
        background: "#23272F",
        showCloseButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "rgb(255, 102, 0)"
    });
})

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
// Al cargar la página, recupera las estadísticas almacenadas en localStorage
let gameWon = parseInt(localStorage.getItem('gameWon')) || 0;
let gameLost = parseInt(localStorage.getItem('gameLost')) || 0;

// Función para guardar las estadísticas en localStorage
function saveStatistics() {
    localStorage.setItem('gameWon', gameWon.toString());
    localStorage.setItem('gameLost', gameLost.toString());
}

// Actualiza las estadísticas en localStorage después de cada partida
function updateStatistics() {
    saveStatistics();
}

// Lógica para incrementar las estadísticas cuando se gana una partida
function winGame() {
    gameWon++;
    updateStatistics();
}

// Lógica para incrementar las estadísticas cuando se pierde una partida
function loseGame() {
    gameLost++;
    updateStatistics();
}

guessForm.addEventListener('submit', function(event) {
    function toast(message, time, background) {
        Toastify({
            text: message,
            duration: time, // Duración en milisegundos
            close: true, // Opcional: botón de cerrar la notificación
            gravity: "bottom", // Opcional: posición de la notificación (top, bottom, left, right)
            position: "center", // Opcional: alineación horizontal de la notificación (left, center, right)
            stopOnFocus: true, // Opcional: detener el temporizador de la notificación cuando el usuario enfoque la ventana
            className: "toast",
            style: {
                background: background,
            },
            offset: {
                x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 4 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
        }).showToast();
    }

    event.preventDefault(); // Evitar el envío del formulario

    const userGuess = parseInt(guessForm.querySelector('input[type="number"]').value);
    
    if (failedGuesses.includes(userGuess)) {
        toast("Ya has intentado este número. Por favor, intenta otro.", 1000, "linear-gradient(to right, #FFA500, #FF4500)");

    } else {
        // Procesar el intento del usuario normalmente
        if (attempts < 5) {
            attempts++; // Suma un intento
            
            if (userGuess === randomNumber) {
                winGame()
                won.textContent = gameWon;

                toast("¡Ganaste! El número correcto es " + randomNumber + ".", 8000, "linear-gradient(to right, #00b09b, #96c93d)");

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
            failedGuessesElement.innerHTML = failedGuesses.map(char => `<div class="numbers-space">${char < 10 ? '0' + char : char}</div>`).join(''); // Mostrar los números fallidos
    
            if (attempts === 5 && userGuess !== randomNumber) {
                loseGame()
                lost.textContent = gameLost;

                toast("¡Perdiste! El número correcto es " + randomNumber + ".", 8000, "linear-gradient(to right, #ff0000, #ff4500)");

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
});