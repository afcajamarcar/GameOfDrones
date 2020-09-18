import express from 'express';

const app = express();

const port = process.env.PORT || 5000;

export const server = app.listen(port, () => {
    console.log(`Running Backend on port ${port}`);
});