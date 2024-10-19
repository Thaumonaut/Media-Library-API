const mongoose = require('mongoose');
 
const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    developer: { type: String },
    publisher: { type: String },
    platform: { type: String },
    rating: { type: String },
    genre: { type: String },
    description: { type: String }
});

const Game = mongoose.model('Game', gameSchema);
 
module.exports = {Game}