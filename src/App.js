import React, { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

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

    let gameBoard = initialGameBoard;

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = firstSquareSymbol;
        }
    }

    const hasDraw = gameTurns.length === 9 && !winner;

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
                {(winner || hasDraw) && <GameOver winner={winner} />}
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
