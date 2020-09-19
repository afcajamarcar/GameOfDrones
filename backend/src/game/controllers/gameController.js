import { createNewGame, makeMove } from '../services/gameService';

export const handleCreateGameAction = async (req, res) => {
    try {
        const newGame = await createNewGame(req);
        if (newGame.isError) {
            let err = handleError(response.message);
            res.status(err.status).json({ message: err.message });
        }
        return res.status(200).json(newGame);
    } catch (error) {
        return handleError('Oops, something bad happened');
    }
};

export const handleMakeMoveAction = async (req, res) => {
    try {
        const result = await makeMove(req);
        if (result.isError) {
            let err = handleError(response.message);
            res.status(err.status).json({ message: err.message });
        }
        return res.status(200).json(result);
    } catch (error) {
        return handleError('Oops, something bad happened');
    }
};

export const handleNotAllowedCall = res => {
    return res.status(405).json({ message: 'Method Not Allowed'})
}

const handleError = (message) => {
    switch (message) {
        case 'missing-body-parameters':
            return { status: 400, message: message };
        case 'error-creating-game':
        case 'error-updating-game':
        case 'error-setting-winnner':
            return { status: 500, message: message };
        default:
            return { status: 500, message: message };
    }
}
