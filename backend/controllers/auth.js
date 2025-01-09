const pg = require('pg');
require('dotenv').config()
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

db.connect();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if(result.rows.length > 0) {
            return res.status(400).json({error: 'User already exists'});
        } else {
            bcrypt.hash(password, 10, async (err, hash) => { // hash password
                if(err) {
                    console.log(err);
                }
                const result = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hash]);
                const user_id = result.rows[0].id;
                res.json({ id: user_id });
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query("SELECT * FROM USERS WHERE email = $1", [email]);
        const user_id = result.rows[0].id;
        if(result) {
            if(result.rows.length > 0){
                bcrypt.compare(password, result.rows[0].password, (err, result) => {
                    if(err) {
                        console.log(err);
                    }
                    if(result) {
                        // const token = jwt.sign({ email: email }, SECRET_KEY);
                        // res.json({token: token});
                        // user = { id: user_id, email: email };
                        // const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET)
                        // res.json({accessToken: accessToken});
                        res.json({ id: user_id });
                    } else {
                        res.status(400).json({error: 'Invalid credentials'});
                    }
                });
            } else {
                return res.status(400).json({error: 'Invalid credentials'});
            }
        } else {
            return res.status(400).json({error: 'Invalid credentials'});
        }
    } catch(err) {
        console.log(err);
        console.log(req.body);
        res.status(500).json({error: 'Internal server error'});
    }
}