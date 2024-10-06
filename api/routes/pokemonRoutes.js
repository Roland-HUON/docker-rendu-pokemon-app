    // Pokemon routes
    const express = require('express');
    const router = express.Router();
    const pokemonController = require('../controllers/pokemonController');

    router.get('/', pokemonController.getPokemons);
    router.get('/:id', pokemonController.getPokemonById);

    module.exports = router;