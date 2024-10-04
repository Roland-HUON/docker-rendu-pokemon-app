const db = require('../db/connect');

const getPokemons = async (req, res) => {
    try {
        await db.connect();
        const results = await db.query('SELECT * FROM pokemons');
        res.json(results);
    } catch (err) {
        console.error('Error fetching pokemons:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
};

const getPokemonById = async (req, res) => {
    const { id } = req.params;
    try {
        await db.connect();
        const results = await db.query('SELECT * FROM pokemons WHERE id = ?', [id]);
        if (results.length === 0) {
            res.status(404).json({ error: 'Pokemon not found' });
        } else {
            res.json(results[0]);
        }
    } catch (err) {
        console.error('Error fetching pokemon:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
};

const addPokemonUserLink = async (req, res) => {
    const { pokemonId } = req.body;
    const { userId } = req.params;
    try {
        await db.connect();
        const results = await db.query('INSERT INTO pokemon_user (pokemon_id, user_id) VALUES (?, ?)', [pokemonId, userId]);
        res.status(201).json({ id: results.insertId, pokemonId, userId });
    } catch (err) {
        console.error('Error adding pokemon-user link:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
};

const getPokemonsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        await db.connect();
        const results = await db.query('SELECT * FROM pokemons WHERE id IN (SELECT pokemon_id FROM pokemon_user WHERE user_id = ?)', [userId]);
        res.json(results);
    } catch (err) {
        console.error('Error fetching pokemons by user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
};

const deletePokemonUserLink = async (req, res) => {
    const { pokemonId, userId } = req.params;
    try {
        await db.connect();
        const results = await db.query('DELETE FROM pokemon_user WHERE pokemon_id = ? AND user_id = ?', [pokemonId, userId]);
        res.json(results);
    } catch (err) {
        console.error('Error deleting pokemon-user link:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
};

module.exports = {
    getPokemons,
    getPokemonById,
    addPokemonUserLink,
    getPokemonsByUserId,
    deletePokemonUserLink,
};