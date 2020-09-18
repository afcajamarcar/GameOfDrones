import { Game } from '../models/Game';

export const createNewGame = async req => {
    let newGameEntity = new Game(
        {
            playerOne: {
                name: req.body.playerOne,
                victory: false
            },
            playerTwo: {
                name: req.body.playerTwo,
                victory: false
            }
        }
    );
    try {
        let response = await newGameEntity.save();
        return response;
    } catch (error) {
        console.error(error);
    }
};