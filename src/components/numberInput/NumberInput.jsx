const NumberInput = ({ userNumber, setUserNumber, handleSubmit }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;
    // Limitar el número de caracteres a 2
    if (value.length <= 2) {
      setUserNumber(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="number">Quantity (between 1 and 99):</label>
        <input
          type="text"
          name="number"
          value={userNumber}
          onChange={handleInputChange}
          maxLength="2"
          autoComplete="off"
        />
        <input type="submit" value="Enviar" />
      </div>
    </form>
  );
};

export default NumberInput;