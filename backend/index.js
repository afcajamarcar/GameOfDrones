import * as db from './config/db';
import express from 'express';
import { gameRouter } from './src/game/routes/gameRoutes';

const app = express();

const port = process.env.PORT || 5000;

(async () => { await db.initMongo() })();

app.use('/api/', gameRouter); // Simplify routes in controller

export const server = app.listen(port, function () {
    console.log(`Running Backend on port ${port}`);
});