// Pokemon routes
const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/', pokemonController.getPokemons);
router.post('/', pokemonController.addPokemon);
router.get('/:id', pokemonController.getPokemonById);
router.put('/:id', pokemonController.updatePokemon);
router.delete('/:id', pokemonController.deletePokemon);
module.exports = router;