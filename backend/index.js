import * as db from './db';
import express from 'express';
import { router } from './routes/routes';

const app = express();

const port = process.env.PORT || 5000;

(async () => { await db.initMongo() })();

app.use('/api/', router); // Simplify routes in controller

export const server = app.listen(port, function () {
    console.log(`Running Backend on port ${port}`);
});