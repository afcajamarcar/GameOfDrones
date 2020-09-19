import React, { useState } from 'react';
import useCreateNewGame from '../api/useCreateNewGame';
import Game from './Game';
import { useSelector } from 'react-redux';

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
                    <div style={{width: '100%', textAlign: 'center', marginTop: '10%'}}>
                        <form style={{display: 'inline-grid'}}>
                            <label htmlFor="playerOne">Player One</label>
                            <input
                                id="playerOne"
                                name='playerOne'
                                type="text"
                                value={playerOne}
                                onChange={e => handleChange(e)}
                            />
                            <label style={{marginTop: '20px'}} htmlFor="playerOne">Player Two</label>
                            <input
                                id="playerTwo"
                                name='playerTwo'
                                type="text"
                                value={playerTwo}
                                onChange={e => handleChange(e)} />
                            <button style={{marginTop: '20px'}} onClick={e => handleSubmit(e)}>Start game</button>
                        </form>
                    </div>
            }

        </div>
    );
}

export default Home;