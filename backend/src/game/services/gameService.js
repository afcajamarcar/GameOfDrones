import { findOneAndUpdate, createGame } from '../models/queries/gameQueries';

const MapPlayersToValues = {
    tie: 0,
    playerOne: 1,
    playerTwo: 2
}

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
            return { winner: MapPlayersToValues.playerOne }
        } else if (playerTwoRounds > 2) {
            return { winner: MapPlayersToValues.playerTwo }
        }
    }
    return { winner: MapPlayersToValues.tie }; //default case for keep playing
};

export const createNewGame = async req => {
    const body = req.body;
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
    }
};

export const makeMove = async req => {
    const body = req.body;
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
    }
    let gameResult = determineWinner(updatedGame.rounds);
    let finishedGame = {}
    if (gameResult.winner != 0) {
        try {
            finishedGame = await findOneAndUpdate(
                { _id: body.gameId },
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
        }
        return finishedGame;
    }
    return updatedGame;
};