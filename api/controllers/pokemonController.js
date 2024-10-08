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

const addPokemon = async (req, res) => {
    const { name, types, hp, damage } = req.body;

    if (!name || !types || !hp || !damage) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const typesString = Array.isArray(types) ? JSON.stringify(types) : types;

    try {
        await db.connect();
        const results = await db.query('INSERT INTO pokemons (name, types, hp, damage) VALUES (?, ?, ?, ?)', [name, typesString, hp, damage]);
        res.status(201).json({ id: results.insertId, name, types: typesString, hp, damage });
    } catch (err) {
        console.error('Error adding pokemon:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
};

const updatePokemon = async (req, res) => {
    const { id } = req.params;
    const { name, types, hp, damage } = req.body;

    const typesString = Array.isArray(types) ? types.join(',') : types;

    try {
        await db.connect();
        const results = await db.query('UPDATE pokemons SET name = ?, types = ?, hp = ?, damage = ? WHERE id = ?', [name, typesString,hp, damage, id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Pokémon non trouvé' });
        }

        res.json({ message: 'Pokémon mis à jour avec succès' });
    } catch (err) {
        console.error('Error updating pokemon:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
};


const deletePokemon = async (req, res) => {
    const { id } = req.params;
    try {
        await db.connect();
        const results = await db.query('DELETE FROM pokemons WHERE id = ?', [id]);
        res.json(results);
    } catch (err) {
        console.error('Error deleting pokemon:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
}

const addPokemonUserLink = async (req, res) => {
    const { pokemonId } = req.body;
    const user = req.user;
    const userId = user.id;
    if (!pokemonId || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
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
    const user = req.user;
    const userId = user.id;
    if (!userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
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
    const user = req.user;
    const userId = user.id;
    const { pokemonId } = req.params;
    if (!userId || !pokemonId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
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
    addPokemon,
    getPokemonById,
    updatePokemon,
    deletePokemon,
    addPokemonUserLink,
    getPokemonsByUserId,
    deletePokemonUserLink,
};