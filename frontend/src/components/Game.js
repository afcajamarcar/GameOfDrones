import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useMakeMoves from '../api/useMakeMoves';

import { Button, Card, CardContent, Typography } from '@material-ui/core';

const Moves = {
    paper: 1,
    rock: 2,
    scissors: 3
}

function Game() {
    const currentGame = useSelector(state => state);

    const [playerOneMove, setPlayerOneMove] = useState(1);

    const [playerTwoMove, setPlayerTwoMove] = useState(1);

    const [playerOneCommit, setPlayerOneCommit] = useState(false);

    const [playerTwoCommit, setPlayerTwoCommit] = useState(false);

    const [makeMovesBody, setMakeMovesBody] = useState({});

    useMakeMoves(makeMovesBody);

    const readyToMakeMove = playerOneMove && playerTwoMove &&
        currentGame._id && playerOneCommit && playerTwoCommit;

    const handleMoveSelectionP1 = move => {
        console.log('player did move', move);
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
        <div className="center">
            <h2>Round {currentGame.winner ? "Result" : currentGame.rounds.length + 1}</h2>
            {
                currentGame.winner ?
                    <div>
                        <div>ABSOLUTE WINNER</div>
                        <div>{currentGame.winner}</div>
                    </div>
                    :
                    <div className="row">
                        <div className="column">
                            <div className="respect"><strong>{currentGame.playerOne}</strong></div>
                            {
                                !playerOneCommit ?
                                    <div>
                                        <Card
                                            className="card-style"
                                            onClick={() => handleMoveSelectionP1(Moves.rock)}>
                                            <CardContent>
                                                <Typography color="textPrimary" gutterBottom>
                                                    Rock
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card
                                            className="card-style"
                                            onClick={() => handleMoveSelectionP1(Moves.paper)}>
                                            <CardContent>
                                                <Typography color="textPrimary" gutterBottom>
                                                    Paper
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card
                                            className="card-style"
                                            onClick={() => handleMoveSelectionP1(Moves.scissors)}>
                                            <CardContent>
                                                <Typography color="textPrimary" gutterBottom>
                                                    Scissor
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setPlayerOneCommit(true)}>
                                            Ready!
                                        </Button>
                                    </div>
                                    :
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setPlayerOneCommit(false)}>
                                        Cancel
                                    </Button>
                            }
                        </div>

                        <div className="column">
                            <div className="respect"><strong>{currentGame.playerTwo}</strong></div>
                            {
                                !playerTwoCommit ?
                                    <div>
                                        <Card
                                            className="card-style"
                                            onClick={() => handleMoveSelectionP2(Moves.rock)}>
                                            <CardContent>
                                                <Typography color="textPrimary" gutterBottom>
                                                    Rock
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card
                                            className="card-style"
                                            onClick={() => handleMoveSelectionP2(Moves.paper)}>
                                            <CardContent>
                                                <Typography color="textPrimary" gutterBottom>
                                                    Paper
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card
                                            className="card-style"
                                            onClick={() => handleMoveSelectionP2(Moves.scissors)}>
                                            <CardContent>
                                                <Typography color="textPrimary" gutterBottom>
                                                    Scissor
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setPlayerTwoCommit(true)}
                                        >
                                            Ready!
                                        </Button>
                                    </div>
                                    :
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setPlayerTwoCommit(false)}
                                    >
                                        Cancel
                                    </Button>
                            }
                        </div>

                        {readyToMakeMove &&
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => makeMoves()}
                            >
                                Go!
                            </Button>
                        }
                    </div>
            }
            <div className="bottom-respect">
                <h3>Score</h3>
                <div className="row">
                    <div className="column">Round</div>
                    <div className="column">Winner</div>
                </div>

                {currentGame.rounds.map((round, idx) =>
                    <div key={idx} className="row">
                        <div className="column">{idx + 1}</div>
                        <div className="column">{round ? round === 1 ? currentGame.playerOne : currentGame.playerTwo : 'tie'}</div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Game;