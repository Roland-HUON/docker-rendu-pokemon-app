// Pokemon routes
const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/pokemons', pokemonController.getPokemons);
router.get('/pokemons/:id', pokemonController.getPokemonById);
router.post('/users/:userId/pokemons', pokemonController.addPokemonUserLink);
router.delete('/users/:userId/pokemons/:pokemonId', pokemonController.deletePokemonUserLink);
router.get('/users/:userId/pokemons', pokemonController.getPokemonsByUserId);

module.exports = router;