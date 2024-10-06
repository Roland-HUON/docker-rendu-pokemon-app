const db = require('../db/connect');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: 'app/.env' });

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
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.header('auth-token', token);
        return res.json({ success: true, user });
    } catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
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
        
        return res.status(201).json({ id: results.insertId, username, email });
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
};

module.exports = {
    getUserByEmailAndPassword,
    createUser
};