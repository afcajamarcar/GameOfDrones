import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    playerOne: { 
        name: { type: String },
        victory: { type: Boolean}
    },
    playerTwo: { 
        name: { type: String },
        victory: { type: Boolean}
    }
});

export const Game = mongoose.model('Game', gameSchema, 'Game');