const Movie = require('../database/movieSchema');


const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const getSingleMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createMovie = async (req, res) => {
    const { title, releaseDate, description,
        director,
        studio,
        cast,
        genre,
        rating,
        duration,} = req.body;
    try {
        const newMovie = new Movie(req.body);

        await newMovie.save
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateMovie = async (req, res) => {
    const { title, releaseDate, description, director, studio,cast, genre, rating,duration,} = req.body;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        res.json(deletedMovie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getMovies, getSingleMovie, createMovie, updateMovie, deleteMovie };
