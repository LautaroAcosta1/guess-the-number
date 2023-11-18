import React, { useState } from 'react';
import Game from "../game/Game";

function Home() {
    const [randomNumber] = useState(Math.floor(Math.random() * 99) + 1);

    return (
        <>
            <h1>{randomNumber}</h1>
            <h1>Guess The Number</h1>
            <Game randomNumber={randomNumber} />
            <Game randomNumber={randomNumber} />
            <Game randomNumber={randomNumber} />
            <Game randomNumber={randomNumber} />
            <Game randomNumber={randomNumber} />
        </>
    )
}

export default Home;