const { Game } = require('../database/gameSchema');
const { validationResult } = require('express-validator');
 
// Create a new game
const createGame = async (req, res) => {
    const { title, developer,
    publisher,
    platform,
    rating,
    genre,
    description} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    const game = new Game(req.body);
    try {
        const savedGame = await game.save();
        res.status(201).json(savedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
 
// Get all games
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
 
// Get a game by ID
const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
 
// Update a game by ID
const updateGameById = async (req, res) => {
    const { title, developer,
        publisher,
        platform,
        rating,
        genre,
        description} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
 
// Delete a game by ID
const deleteGameById = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json({ message: 'Game deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createGame,
    getAllGames,
    getGameById,
    updateGameById,
    deleteGameById
}