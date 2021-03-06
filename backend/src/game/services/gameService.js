import { findOneAndUpdate, createGame, fetchGames } from '../models/queries/gameQueries';

const MapPlayersToValues = {
    tie: 0,
    playerOne: 1,
    playerTwo: 2
};

const calculateResult = (playerOneMove, playerTwoMove) => {
    let result = playerOneMove - playerTwoMove;
    switch (result) {
        case -1:
        case 2:
            return MapPlayersToValues.playerOne;
        case 1:
        case 2:
            return MapPlayersToValues.playerTwo;
        default:
            return MapPlayersToValues.tie;
    }
};

const determineWinner = rounds => {
    if (rounds.length > 2) {
        const playerOneRounds = rounds.filter(item => item == MapPlayersToValues.playerOne).length;
        const playerTwoRounds = rounds.filter(item => item == MapPlayersToValues.playerTwo).length;
        if (playerOneRounds > 2) {
            return { winner: MapPlayersToValues.playerOne };
        } else if (playerTwoRounds > 2) {
            return { winner: MapPlayersToValues.playerTwo };
        }
    }
    return { winner: MapPlayersToValues.tie }; //default case for keep playing
};

const setWinner = async (gameResult, gameId, updatedGame) => {
    let finishedGame = {};
    try {
        finishedGame = await findOneAndUpdate(
            { _id: gameId },
            {
                $set: {
                    winner: gameResult.winner == MapPlayersToValues.playerOne
                        ? updatedGame.playerOne
                        : updatedGame.playerTwo
                }
            },
            { new: true }
        );
    } catch (error) {
        console.error(error);
        return { isError: true, message: 'error-setting-winnner' };
    }
    return finishedGame;
};

export const getGamesList = async (req) => {
    try {
        return await fetchGames(req);
    } catch (error) {
        console.error(error);
        return { isError: true, message: 'error-creating-game' };
    }
};

export const createNewGame = async req => {
    const body = req.body;
    if (!body.playerOne || !body.playerTwo) return { isError: true, message: 'missing-body-parameters' };
    try {
        let newGame = await createGame(
            {
                playerOne: body.playerOne,
                playerTwo: body.playerTwo,
                rounds: [],
                winner: ''
            }
        );
        return newGame;
    } catch (error) {
        console.error(error);
        return { isError: true, message: 'error-creating-game' };
    }
};

export const makeMove = async req => {
    const body = req.body;
    if (!body.playerOne || !body.playerTwo || !body.gameId) { 
        return { isError: true, message: 'missing-body-parameters' }; 
    }
    let updatedGame = {};
    try {
        let result = calculateResult(body.playerOne, body.playerTwo);
        updatedGame = await findOneAndUpdate(
            { _id: body.gameId },
            { $push: { rounds: result } },
            { new: true }
        );
    } catch (error) {
        console.error(error);
        return { isError: true, message: 'error-updating-game' };
    }
    let gameResult = determineWinner(updatedGame.rounds);
    if (gameResult.winner != 0) {
        return setWinner(gameResult, body.gameId, updatedGame)
    }
    return updatedGame;
};