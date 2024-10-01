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

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date, user_id } = req.body;

    try {
        await db.query('INSERT INTO expense (title, amount, category, description, date, user_id) VALUES ($1, $2, $3, $4, $5, $6)', [title, parseFloat(amount), category, description, new Date(date), user_id]);
        res.status(200).json({message: 'Expense added successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'});
    }

}

exports.getExpense = async (req, res) => {
    const {user_id} = req.params;

    try {
        
        const result = await db.query(
            'SELECT * FROM expense WHERE user_id = $1 ORDER BY date DESC', [user_id]
        );
        const expenses = result.rows;
        res.status(200).json(expenses);

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'});
    }
}

exports.deleteExpense = async (req, res) => {
    console.log(req.params)
    const id = req.params.id;
    db.query('DELETE FROM expense WHERE id = $1', [id])
        .then(() => {
            res.status(200).json({message: 'Expense deleted successfully'});
        })
        .catch((error) => {
            res.status(500).json({error: 'Internal server error'});
        })
}