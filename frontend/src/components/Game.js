import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useMakeMoves from '../api/useMakeMoves';

const Moves = {
    paper: 1,
    rock: 2,
    scissors: 3
}

function Game() {
    const currentGame = useSelector(state => state);
    // console.log('globalData', currentGame);

    const [playerOneMove, setPlayerOneMove] = useState(1);

    const [playerTwoMove, setPlayerTwoMove] = useState(1);

    const [playerOneCommit, setPlayerOneCommit] = useState(false);

    const [playerTwoCommit, setPlayerTwoCommit] = useState(false);

    const [makeMovesBody, setMakeMovesBody] = useState({});

    useMakeMoves(makeMovesBody);

    const readyToMakeMove = playerOneMove && playerTwoMove &&
        currentGame._id && playerOneCommit && playerTwoCommit;

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
                gameId: currentGame._id
            });
            setPlayerOneMove(1);
            setPlayerOneCommit(false);
            setPlayerTwoMove(1);
            setPlayerTwoCommit(false);
        };
    };

    return (
        <div style={{textAlign: 'center'}}>
            <h2>Round {currentGame.winner ? "Result" : currentGame.rounds.length + 1}</h2>
            {
                currentGame.winner ?
                    <div>
                        <div>ABSOLUTE WINNER</div>
                        <div>{currentGame.winner}</div>
                    </div>
                    :
                    <div style={{ display: 'table', width: '100%' }}>
                        <div style={{ float: 'left', width: '50%' }}>
                            <div style={{ padding: '4px' }}><strong>{currentGame.playerOne}</strong></div>
                            {
                                !playerOneCommit ?
                                    <div>
                                        <div style={{ border: 'solid black', width: '50%', margin: '4px auto' }} onClick={e => handleMoveSelectionP1(Moves.rock)}>Rock</div>
                                        <div style={{ border: 'solid black', width: '50%', margin: '4px auto' }} onClick={e => handleMoveSelectionP1(Moves.paper)}>Paper</div>
                                        <div style={{ border: 'solid black', width: '50%', margin: '4px auto' }} onClick={e => handleMoveSelectionP1(Moves.scissors)}>Scissor</div>
                                        <button onClick={() => setPlayerOneCommit(true)}>Ready!</button>
                                    </div>
                                    :
                                    <button onClick={() => setPlayerOneCommit(false)}>Cancel</button>
                            }
                        </div>

                        <div style={{ float: 'left', width: '50%' }}>
                            <div style={{ padding: '4px' }}><strong>{currentGame.playerTwo}</strong></div>
                            {
                                !playerTwoCommit ?
                                    <div>
                                        <div style={{ border: 'solid black', width: '50%', margin: '4px auto' }} onClick={e => handleMoveSelectionP2(Moves.rock)}>Rock</div>
                                        <div style={{ border: 'solid black', width: '50%', margin: '4px auto' }} onClick={e => handleMoveSelectionP2(Moves.paper)}>Paper</div>
                                        <div style={{ border: 'solid black', width: '50%', margin: '4px auto' }} onClick={e => handleMoveSelectionP2(Moves.scissors)}>Scissor</div>
                                        <button onClick={() => setPlayerTwoCommit(true)}>Ready!</button>
                                    </div>
                                    :
                                    <button onClick={() => setPlayerTwoCommit(false)}>Cancel</button>
                            }
                        </div>

                        {readyToMakeMove &&
                            <button onClick={() => makeMoves()}>Go!</button>
                        }
                    </div>
            }
            <div>
                <h3>Score</h3>
                <div style={{ display: 'table', width: '100%' }}>
                    <div style={{ float: 'left', width: '50%' }}>Round</div>
                    <div style={{ float: 'left', width: '50%' }}>Winner</div>
                </div>

                {currentGame.rounds.map((round, idx) =>
                    <div key={idx} style={{ display: 'table', width: '100%' }}>
                        <div style={{ float: 'left', width: '50%' }}>{idx + 1}</div>
                        <div style={{ float: 'left', width: '50%' }}>{round ? round === 1 ? currentGame.playerOne : currentGame.playerTwo : 'tie'}</div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Game;