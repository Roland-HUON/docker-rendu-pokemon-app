const db = require('../db/connect');

// const getUsers = async (req, res) => {
//     try {
//         await db.connect();
//         const results = await db.query('SELECT * FROM users');
//         res.json(results);
//     } catch (err) {
//         console.error('Error fetching users:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     } finally {
//         await db.end();
//     }
// };

const getUserByEmailAndPassword = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields', test: req.body });
    }
    try {
        await db.connect();
        const results = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(results[0]);
        }
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.end();
    }
}

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
    // getUsers,
    getUserByEmailAndPassword,
    createUser
};