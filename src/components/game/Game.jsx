import React, { useState } from 'react';
import NumberInput from '../numberInput/NumberInput';
import "./game.css"

function Game({ randomNumber }) {
  const [userNumber, setUserNumber] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [submittedNumber, setSubmittedNumber] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Número ingresado:", userNumber);
    setShowMessage(true);
    setSubmittedNumber(userNumber); // Guardar el número ingresado por el usuario
  };

  let message1;
  let message2;
  let inputComponent;

  if (!showMessage) {
    // Renderizar el input si no se ha mostrado el mensaje
    inputComponent = (
      <NumberInput
        userNumber={userNumber}
        setUserNumber={setUserNumber}
        handleSubmit={handleSubmit}
      />
    );
  } else {
    // Mostrar mensaje correspondiente al usuario
    if (parseInt(submittedNumber) === randomNumber) {
      message2 = <p className="success-message">¡Adivinaste el número!</p>;
    } else if (randomNumber > submittedNumber) {
      message1 = <p>El número es mayor.</p>;
    } else {
      message1 = <p>El número es menor.</p>;
    }
  }

  return (
    <div className="game">
      {inputComponent}
      <h3>{submittedNumber}</h3>
      {message1}
      {message2}
    </div>
  );
}

export default Game;