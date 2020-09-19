import cors from 'cors';
import express from 'express';
import * as db from './config/db';
import { gameRouter } from './src/game/routes/gameRoutes';

const app = express();

const port = process.env.PORT || 5000;

app.use(cors()); // Allow to receive request while develop phase

(async () => { await db.initMongo() })();

app.use('/api/', gameRouter); // Simplify routes in controller

export const server = app.listen(port, function () {
    console.log(`Running Backend on port ${port}`);
});