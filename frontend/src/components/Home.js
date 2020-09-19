import React, { useState, useEffect } from 'react';
import useCreateNewGame from '../api/useCreateNewGame';
import { useHistory } from 'react-router-dom';

function Home() {
    const [playerOne, setPlayerOne] = useState('');
    const [playerTwo, setPlayerTwo] = useState('');
    const [newGameBody, setNewGameBody] = useState({});
    const history = useHistory();

    const newGame = useCreateNewGame(newGameBody);

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'playerOne') setPlayerOne(value);
        if (name === 'playerTwo') setPlayerTwo(value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setNewGameBody({playerOne: playerOne, playerTwo: playerTwo});
    };

    if(newGame.response && newGame.response._id) {
        // TODO push to game component
        // history.push({
            
        // });
    }

    return (
        <div>
            <h1>Game of Drones!</h1>
            <div>Logo super cool aca</div>
            <form action="">
                <label htmlFor="playerOne">Player One</label>
                <input 
                    id="playerOne" 
                    name='playerOne' 
                    type="text"
                    value={playerOne}
                    onChange={e => handleChange(e)} 
                />
                <label htmlFor="playerOne">Player Two</label>
                <input
                    id="playerTwo" 
                    name='playerTwo' 
                    type="text" 
                    value={playerTwo} 
                    onChange={e => handleChange(e)}/>
                <button onClick={e => handleSubmit(e)}>Start game</button>
            </form>
        </div>
    );
}

export default Home;