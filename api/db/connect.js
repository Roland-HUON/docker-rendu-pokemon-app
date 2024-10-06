const mysql = require('mysql2');
const waitPort = require('wait-port');
const dotenv = require('dotenv');
dotenv.config({ path : 'app/.env'});

const dbConfig = {
    host: 'db',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'pokemon',
    charset: 'utf8mb4'
};

const waitForDatabase = async () => {
    await waitPort({ host: dbConfig.host, port: 3306 });
};

const connectWithRetry = async () => {
    try {
        await waitForDatabase();
        const connection = mysql.createConnection(dbConfig);
        console.log('Successfully connected to the database');
        return connection;
    } catch (err) {
        console.error('Error connecting to the database:', err);
        console.log('Retrying in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        return connectWithRetry();
    }
};

const db = {
    connection: null,
    async connect() {
        this.connection = await connectWithRetry();
    },
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    end() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
};

module.exports = db;