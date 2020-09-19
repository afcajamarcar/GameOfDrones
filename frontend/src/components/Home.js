import React, { useState } from 'react';
import useCreateNewGame from '../api/useCreateNewGame';
import Game from './Game';
import { useSelector } from 'react-redux';

import { Button, FormControl, Input, InputLabel } from '@material-ui/core';

function Home() {
    const [playerOne, setPlayerOne] = useState('');
    const [playerTwo, setPlayerTwo] = useState('');
    const [newGameBody, setNewGameBody] = useState({});
    const currentGame = useSelector(state => state);
    console.log('currentGame from home', currentGame)

    useCreateNewGame(newGameBody);

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'playerOne') setPlayerOne(value);
        if (name === 'playerTwo') setPlayerTwo(value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setNewGameBody({ playerOne: playerOne, playerTwo: playerTwo });
    };

    return (
        <div className="center">
            <h1 >Game of Drones!</h1>
            <div >Logo super cool aca</div>
            {
                currentGame._id
                    ?
                    <Game />
                    :
                    <div className="meta-container">
                        <div className="form-container">
                            <FormControl>
                                <InputLabel >Player One</InputLabel>
                                <Input
                                    id="playerOne"
                                    name='playerOne'
                                    type="text"
                                    value={playerOne}
                                    onChange={e => handleChange(e)}
                                />
                            </FormControl>
                            <FormControl className="separate-top">
                                <InputLabel >Player Two</InputLabel>
                                <Input
                                    id="playerTwo"
                                    name='playerTwo'
                                    type="text"
                                    value={playerTwo}
                                    onChange={e => handleChange(e)} />
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                className="separate-top"
                                onClick={e => handleSubmit(e)}>
                                Start game
                            </Button>
                        </div>
                    </div>
            }

        </div>
    );
}

export default Home;