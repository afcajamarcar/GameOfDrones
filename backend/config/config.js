import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 5000;

export const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/gameOfDrones';