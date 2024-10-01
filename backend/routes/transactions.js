const router = require('express').Router();
const { addIncome, getIncome, deleteIncome } = require('../controllers/income')
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense')


router.post('/add-income', addIncome)
    .get('/get-income/:user_id', getIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expense/:user_id', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router;