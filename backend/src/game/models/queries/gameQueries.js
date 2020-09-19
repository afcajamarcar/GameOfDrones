import { Game, Games } from '../Game';

export const createGame = async (values) => {
    try {
        let newGameEntity = new Game(values);
        let newGame = newGameEntity.save();
        return newGame;
    } catch (error) {
        throw new Error(error);
    }
};

export const findOneAndUpdate = async (query, operation, properties) => {
    try {
        let updatedGame = await Games.findOneAndUpdate(
            query,
            operation,
            properties
        );
        return updatedGame;
    } catch (error) {
        throw new Error(error);
    }
};

export const fetchGames = async () => {
    try {
        let gamesList = await Games.find({});
        return gamesList;
    } catch (error) {
        throw new Error(error);
    }
};