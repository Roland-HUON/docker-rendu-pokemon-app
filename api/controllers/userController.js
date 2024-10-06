const db = require('../db/connect');

const getUserByEmailAndPassword = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        await db.connect();
        const results = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        res.json({ success: true, user });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
};

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        await db.connect();
        
        const results = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        
        res.status(201).json({ id: results.insertId, username, email });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
};

module.exports = {
    getUserByEmailAndPassword,
    createUser
};
