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
        <div>
            <h1 style={{ textAlign: 'center' }}>Game of Drones!</h1>
            <div style={{ textAlign: 'center' }}>Logo super cool aca</div>
            {
                currentGame._id
                    ?
                    <Game />
                    :
                    <div style={{ width: '100%', marginTop: '10%', textAlign: 'center' }}>
                        <div style={{ width: '50%', display: 'inline-grid' }}>
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
                            <FormControl style={{marginTop: '25px'}}>
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
                                style={{ marginTop: '25px' }}
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