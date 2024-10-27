const Movie = require('../database/movieSchema');


const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        if (!movies) {
            return res.status(404).json({ message: 'Movies not found' });
        }
        res.json(movies);    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const getSingleMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createMovie = async (req, res) => {
    const { title, releaseDate, description, director, studio, cast, genre, rating, duration } = req.body;

    if (!title || !releaseDate || !description || !director || !studio || !cast || !genre || !rating || !duration) {
        return res.status(400).json({
            message: "All fields are required: title, releaseDate, description, director, studio, cast, genre, rating, duration"
        });
    }

    const newMovie = new Movie({
        title,
        releaseDate,
        description,
        director,
        studio,
        cast,
        genre,
        rating,
        duration
    });

    try {
        await newMovie.save();
        return res.status(201).json({
            message: "Movie created successfully",
            movieId: newMovie._id
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to add movie",
            error: err.message
        });
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
