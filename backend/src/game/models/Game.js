import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    playerOne: { type: String },
    playerTwo: { type: String },
    rounds: { type:  [Number]},
    winner: { type: String }
});

export const Game = mongoose.model('Game', gameSchema, 'Game');
export const Games = mongoose.model('Game', gameSchema);