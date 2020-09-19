import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    playerOne: { type: String },
    playerTwo: { type: String },
    rounds: { type:  [Number]},
    winner: { type: String }
});

gameSchema.plugin(mongoosePaginate);

export const Game = mongoose.model('Game', gameSchema, 'Game');
export const Games = mongoose.model('Game', gameSchema);