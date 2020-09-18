import express from 'express';

import { handleCreateGameAction, handleMakeMoveAction } from '../controllers/gameController';

export const gameRouter = express.Router();

gameRouter.use(express.json()); // Middleware to parse incoming requests

gameRouter
    .post('/create_game', (req, res) => { return handleCreateGameAction(req, res) });

gameRouter
    .post('/make_move', (req, res) => { return handleMakeMoveAction(req, res) });