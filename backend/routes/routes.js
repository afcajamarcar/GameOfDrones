import express from 'express';

import { handleCreateGameAction } from '../controllers/controller';

export const router = express.Router();

router.use(express.json()); // Middleware to parse incoming requests

router
    .post('/create_game', (req, res) => { return handleCreateGameAction(req, res) });