const express = require('express');
const router = express.Router();
const {getMovies, getSingleMovie, createMovie, updateMovie, deleteMovie} = require('../controllers/moviesController');

router.get('/', getMovies);

router.get('/:id', getSingleMovie);

router.post('/', createMovie);

router.put('/:id', updateMovie);

router.delete('/:id', deleteMovie);

module.exports = router;