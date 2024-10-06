// User routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const pokemonController = require('../controllers/pokemonController');

// router.get('/users', userController.getUsers);
router.post('/login', userController.getUserByEmailAndPassword);
router.post('/signup', userController.createUser);
router.post('/', userController.createUser);
router.post('/:userId/pokemons', pokemonController.addPokemonUserLink);
router.delete('/:userId/pokemons/:pokemonId', pokemonController.deletePokemonUserLink);
router.get('/:userId/pokemons', pokemonController.getPokemonsByUserId);

module.exports = router;