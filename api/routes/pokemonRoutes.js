// Pokemon routes
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path : 'app/.env'});
const pokemonController = require('../controllers/pokemonController');

function authenticateToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Accès refusé');
  
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified; // Stocke les infos de l'utilisateur dans la requête
      next(); // Continue vers la route suivante
    } catch (err) {
      res.status(400).send('Token invalide');
    }
}

router.get('/', pokemonController.getPokemons);
router.post('/', pokemonController.addPokemon);
router.get('/:id', pokemonController.getPokemonById);
router.put('/:id', pokemonController.updatePokemon);
router.delete('/:id', pokemonController.deletePokemon);
module.exports = router;
