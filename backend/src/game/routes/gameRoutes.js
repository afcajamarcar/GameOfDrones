import express from 'express';

import { handleCreateGameAction } from '../controllers/gameController';

export const gameRouter = express.Router();

gameRouter.use(express.json()); // Middleware to parse incoming requests

gameRouter
    .post('/create_game', (req, res) => { return handleCreateGameAction(req, res) });