const pg = require('pg');
require('dotenv').config()

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

db.connect();

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date, user_id } = req.body;

    try {
        console.log("Attempting to add income...");
        const result = await db.query('INSERT INTO income (title, amount, category, description, date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [title, parseFloat(amount), category, description, new Date(date), user_id]);
        console.log(result.rows);
        res.status(200).json({message: 'Income added successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'});
    }

}

exports.getIncome = async (req, res) => {
    const { user_id } = req.params; // Ensure user_id is destructured properly

    try {
        console.log("User ID:", user_id, typeof user_id); // Log the user_id for debugging
        const result = await db.query(
            'SELECT * FROM income WHERE user_id = $1 ORDER BY date DESC',
            [parseInt(user_id, 10)] // Ensure user_id is parsed as an integer
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error); // Log detailed error
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const id = req.params.id;
    await db.query('DELETE FROM income WHERE id = $1', [id])
        .then(() => {
            res.status(200).json({message: 'Income deleted successfully'});
        })
        .catch((error) => {
            res.status(500).json({error: 'Internal server error'});
        })
}