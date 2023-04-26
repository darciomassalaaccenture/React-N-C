import { useState, useEffect } from "react";
import PlayerSelection from './PlayerSelection';
import Leaderboard from './Leaderboard';
import Board from './Board';
import updateLeaderboard from '../apis/updateLeaderBoard';
import getLeaderboard from '../apis/getLeaderboard';

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [player1Next, setPlayer1Next] = useState(true);
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [error, setError] = useState("");
    const [gameInProgress, setGameInProgress] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);

    const startGame = () => {
        if (!player1 || !player2) {
            setError("Enter the name of each player!");
        } else if (player1 === player2) {
            setError("Player names must be different!");
        }
        else {
            setError("");
            setGameInProgress(true);
            setPlayer1Next(true);
        }
    };

    const player1Input = e => setPlayer1(e.target.value);

    const player2Input = e => setPlayer2(e.target.value);

    const handleClick = (i) => {
        const newSquares = squares.slice();
        if (!newSquares[i] && !isWinner(newSquares)) {
            newSquares[i] = player1Next ? 'O' : 'X';
            setSquares(newSquares);
            setPlayer1Next(!player1Next);
        };
    };

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setPlayer1('');
        setPlayer2('');
        setGameInProgress(false);
        setGameCompleted(false);
    };

    let status;
    let result;
    if (gameInProgress && isWinner(squares)) {
        status = 'Winner: ' + (!player1Next ? player1 + ' (\'O\')' : player2 + ' (\'X\')');
        result = !player1Next ? player1 : player2;
    } else if (gameInProgress && isDraw(squares)) {
        status = 'Draw!'
        result = 'draw';
    } else if (!gameInProgress) {
        status = 'Start a game!'
    } else {
        status = 'Next player: ' + (gameInProgress ? (player1Next ? player1 + ' (\'O\')' : player2 + ' (\'X\')') : '');
    }

    if (!gameCompleted && result) {
        if (result === player1) {
            setPlayer1Score(3);
            setPlayer2Score(0);
        }
        else if (result === player2) {
            setPlayer1Score(0);
            setPlayer2Score(3);
        } else {
            setPlayer1Score(1);
            setPlayer2Score(1);
        }

        setGameCompleted(true);
    }

    useEffect(() => {
        if (gameCompleted === null) {
            getLeaderboard().then(setLeaderboard).catch(setLeaderboard);
        }
        else if (gameCompleted) {
            updateLeaderboard(player1, player1Score, player2, player2Score)
                .then(getLeaderboard).then(setLeaderboard).catch(setLeaderboard);
        };
    }, [gameCompleted]);

    return (
        <>
            <div className="title">
                <label>Tic Tac Toe!</label>
            </div>
            <div className="game">
                <div className="players">
                    <div>
                        <PlayerSelection
                            player1={player1}
                            player2={player2}
                            player1Input={player1Input}
                            player2Input={player2Input}
                            error={error}
                            startGame={startGame}
                            gameInProgress={gameInProgress}
                        />
                    </div>
                    <div className="leaderboard">
                        <Leaderboard
                            leaderboard={leaderboard}
                        />
                    </div>
                </div>
                <div className="game-board">
                    <Board
                        squares={squares}
                        onClick={i => handleClick(i)}
                        gameInProgress={gameInProgress}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <button type="button" onClick={resetGame} disabled={!gameInProgress}>Reset Game!</button>
                    </div>
                </div>
            </div>
        </>
    );
};

function isDraw(squares) {
    return !squares.some(square => !square);
}

function isWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return true;
        }
    }
    return false;
};

export default Game;