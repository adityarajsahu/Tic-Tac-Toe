import React, { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

const deriveActivePlayer = (gameTurns) => {
    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }

    return currentPlayer;
};

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    // const [activePlayer, setActivePlayer] = useState("X");

    const activePlayer = deriveActivePlayer(gameTurns);

    const handleSelectSquare = (rowIndex, colIndex) => {
        // setActivePlayer((currentActivePlayer) => (currentActivePlayer === "X" ? "O" : "X"));
        setGameTurns((prevGameTurns) => {
            const currentPlayer = deriveActivePlayer(prevGameTurns);

            const updatedTurns = [
                { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
                ...prevGameTurns,
            ];

            return updatedTurns;
        });
    };

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
                    <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
                </ol>
                <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
