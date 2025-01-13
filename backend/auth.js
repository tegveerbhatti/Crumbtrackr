const pg = require('pg');
require('dotenv').config()
const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;
const whitelist = ['http://localhost:5173', 'https://crumbtrackr.netlify.app/'];

const corsOptions = {
    origin: ['http://localhost:5173', 'https://crumbtrackr.netlify.app'],
    credentials: true,
  };

app.use(express.json());
app.use(cors(corsOptions));



const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();

// Configure session middleware
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'lax',
      },
    })
  );

// Initialize Passport and use session middleware
app.use(passport.initialize());
app.use(passport.session());

// Define Passport GoogleStrategy
passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
          let user;
          if (result.rows.length === 0) {
            const newUser = await db.query(
              "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
              [profile.email, null]
            );
            user = newUser.rows[0];
          } else {
            user = result.rows[0];
          }
          return done(null, {
            id: user.id,
            email: user.email,
            isAuthenticated: true,
          }); // Ensure user object includes all required fields
        } catch (err) {
          return done(err);
        }
      }
    )
  );

// Define Passport LocalStrategy
passport.use("local", new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (result.rows.length === 0) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const user = result.rows[0];
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    console.log("LOGGED IN");
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user.id); // determines what data from the user object should be stored in the session
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => { // retrieve the whole user object from the database using the id
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return done(null, false);
        }
        done(null, result.rows[0]);
    } catch (err) {
        done(err);
    }
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                const result = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hash]);
                const newUser = { id: result.rows[0].id, email: result.rows[0].email };
                req.login(newUser, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: 'Login after registration failed' });
                    }
                    res.json({ user: newUser });
                });
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        req.login(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ error: 'Failed to log in' });
            }
            return res.json({ success: true, user: { id: user.id, email: user.email } });
        });
    })(req, res, next);
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
  
    app.get(
        '/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        (req, res) => {
          console.log('Authenticated user:', req.user); // Debug
          res.redirect('http://localhost:5173/dashboard'); // Redirect after login
        }
      );

    app.get('/logout', (req, res) => { // NEEDS TO BE GET BECAUSE LOGOUT BUTTON IS ANCHOR TAG AND THOSE ONLY SUPPORT GET REQUESTS
        req.logout((err) => {
            if (err) {
                console.error("Logout error:", err);
                return res.status(500).json({ error: "Logout failed" });
            }
            req.session.destroy((err) => {
                console.log("Session destroyed");
                if (err) {
                    console.error("Session destroy failed:", err);
                    return res.status(500).json({ error: "Failed to destroy session" });
                }
                res.clearCookie('connect.sid', { 
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: 'strict'
                });
                console.log("Cookie cleared");

                res.json({ message: "Logged out successfully" });
            });
        });
    });
    
    app.get('/userinfo', (req, res) => {
        console.log('Session user:', req.user); // Debug
        if (req.isAuthenticated()) {
          res.json({ user: { id: req.user.id, email: req.user.email, isAuthenticated: true } });
        } else {
          res.status(401).json({ error: 'Unauthorized' });
        }
      });


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

