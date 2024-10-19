const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    releaseDate: String,
    description: String,
    director: String,
    studio: String,
    cast: [String],
    genre: String,
    rating: String,
    duration: String,
});
