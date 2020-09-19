import React, { useState } from 'react';
import useMakeMoves from '../api/useMakeMoves';

const Moves = {
    paper: 1,
    rock: 2,
    scissors: 3
}

function Game(props) {
    const gameData = (props.newGame && props.newGame._id) ||
        JSON.parse(localStorage.getItem('currentGame'));
    console.log(gameData);

    const [playerOneMove, setPlayerOneMove] = useState(1);

    const [playerTwoMove, setPlayerTwoMove] = useState(1);

    const [playerOneCommit, setPlayerOneCommit] = useState(false);

    const [playerTwoCommit, setPlayerTwoCommit] = useState(false);

    const [makeMovesBody, setMakeMovesBody] = useState({});

    const movesResult = useMakeMoves(makeMovesBody);
    console.log('movesResult', movesResult);

    if (movesResult.response) {
        localStorage.setItem('currentGame', JSON.stringify(movesResult.response));
    }

    const readyToMakeMove = playerOneMove && playerTwoMove &&
        gameData._id && playerOneCommit && playerTwoCommit;

    const handleMoveSelectionP1 = move => {
        setPlayerOneMove(move);
    };

    const handleMoveSelectionP2 = move => {
        setPlayerTwoMove(move);
    };

    const makeMoves = () => {
        if (readyToMakeMove) {
            setMakeMovesBody({
                playerOne: playerOneMove,
                playerTwo: playerTwoMove,
                gameId: gameData._id
            });
            setPlayerOneCommit(false);
            setPlayerTwoCommit(false);
        };
    };

    return (
        <div>
            <h2>Round {gameData.rounds.length + 1}</h2>
            <div style={{ padding: '4px' }}><strong>{gameData.playerOne}</strong></div>
            {
                !playerOneCommit ?
                    <div>
                        <div style={{ padding: '4px' }} onClick={e => handleMoveSelectionP1(Moves.rock)}>Rock</div>
                        <div style={{ padding: '4px' }} onClick={e => handleMoveSelectionP1(Moves.paper)}>Paper</div>
                        <div style={{ padding: '4px' }} onClick={e => handleMoveSelectionP1(Moves.scissors)}>Scissor</div>
                        <button onClick={() => setPlayerOneCommit(true)}>ok</button>
                    </div>
                    :
                    <button onClick={() => setPlayerOneCommit(false)}>Cancel</button>
            }

            <div style={{ padding: '4px' }}><strong>{gameData.playerTwo}</strong></div>
            {
                !playerTwoCommit ?
                    <div>
                        <div style={{ padding: '4px' }} onClick={e => handleMoveSelectionP2(Moves.rock)}>Rock</div>
                        <div style={{ padding: '4px' }} onClick={e => handleMoveSelectionP2(Moves.paper)}>Paper</div>
                        <div style={{ padding: '4px' }} onClick={e => handleMoveSelectionP2(Moves.scissors)}>Scissor</div>
                        <button onClick={() => setPlayerTwoCommit(true)}>ok</button>
                    </div>
                    :
                    <button onClick={() => setPlayerTwoCommit(false)}>Cancel</button>
            }
            {readyToMakeMove &&
                <button onClick={() => makeMoves()}>Go!</button>
            }

        </div>
    );
}

export default Game;