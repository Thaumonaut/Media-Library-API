const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    releaseDate: Date,
    description: String,
    director: String,
    studio: String,
    cast: [String],
    genre: String,
    rating: Number,
    duration: Number,
    rating: String
});

module.exports = mongoose.model('Movie', movieSchema)