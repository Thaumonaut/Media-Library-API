const express = require('express');
const router = express.Router();
const movieValidator = require('../middleware/movieschema');
const {getMovies, getSingleMovie, createMovie, updateMovie, deleteMovie} = require('../controllers/movies');

router.get('/', getMovies);

router.get('/:id', getSingleMovie);

router.post('/', 
    createMovie
  );

router.put('/:id', updateMovie);

router.delete('/:id', deleteMovie);

module.exports = router;