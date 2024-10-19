const router = require('express').Router();
const { createGame, getAllGames, getGameById, updateGameById, deleteGameById } = require('../controllers/gamesController.js');
const { gameValidationRules, checkValidation } = require('../middleware/gamesValidation.js');

// Create a new game
router.post('/:id', gameValidationRules, checkValidation, createGame);
 
// Get all games
router.get('/', getAllGames);
 
// Get a game by ID
router.get('/:id', getGameById);
 
// Update a game by ID
router.put('/:id', gameValidationRules, checkValidation, updateGameById);
 
// Delete a game by ID
router.delete('/:id', deleteGameById);

module.exports = router;
