import express from 'express';
import cors from 'cors';
import { addIncome, getIncome, deleteIncome, addExpense, getExpense, deleteExpense } from './functions.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.post('/api/add-income', addIncome);
app.get('/api/get-income/:user_id', getIncome);
app.delete('/api/delete-income/:id', deleteIncome);
app.post('/api/add-expense', addExpense);
app.get('/api/get-expense/:user_id', getExpense);
app.delete('/api/delete-expense/:id', deleteExpense);

// Export handler for Vercel
export default app;
