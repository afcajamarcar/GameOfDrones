import { createNewGame } from '../services/gameService';

export const handleCreateGameAction = async (req, res) => {
    try {
        const newGame = await createNewGame(req);
        return res.status(200).json(newGame);
    } catch (error) {
        return res.status(500).json({message: 'Oops, something bad happened'});
    }
}