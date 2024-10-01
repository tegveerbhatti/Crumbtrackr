const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { Client } = require('pg');

// Set up PostgreSQL client
const db = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

// Configure the Local Strategy
passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function verify(email, password, cb) {
    try {
        const result = await db.query("SELECT * FROM USERS WHERE email = $1", [email]);
        // const user_id = result.rows[0].id;
        if(result) {
            if(result.rows.length > 0){
                user = result.rows[0];
                bcrypt.compare(password, result.rows[0].password, (err, result) => {
                    if(err) {
                        console.log(err);
                        return cb(err);
                    }
                    if(result) {
                        return cb(null, user);
                        // res.json({ id: user_id });
                    } else {
                        res.status(400).json({error: 'Invalid credentials'});
                        return cb(null, false);
                    }
                });
            } else {
                return cb("User not found");
                return res.status(400).json({error: 'Invalid credentials'});
            }
        } else {
            return cb("User not found");
            return res.status(400).json({error: 'Invalid credentials'});
        }
    } catch(err) {
        console.log(err);
        console.log(req.body);
        res.status(500).json({error: 'Internal server error'});
    }
}));

module.exports = passport;
