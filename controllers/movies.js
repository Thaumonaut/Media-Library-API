const Movie = require('../middleware/movieschema');


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
    const movie = new Movie(req.body);
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateMovie = async (req, res) => {
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