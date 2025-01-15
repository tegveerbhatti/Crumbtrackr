import React, { useState, useContext,  createContext, useEffect, useRef } from 'react';  
import axios from 'axios';
import { useAuthContext } from './AuthContext';
// const BASE_URL = "http://35.183.64.163:3000/api/";
// const BASE_URL = "http://localhost:3000/api/";
const BASE_URL = "https://crumbtrackr.com/api/";


const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const { getUser, user } = useAuthContext();
    const foundUser = getUser();    

    useEffect(() => {
        if (foundUser && foundUser.id) {
            console.log(`Fetching data for user ID: ${foundUser.id}`);
            getIncome(foundUser.id);
            getExpenses(foundUser.id);
        }
    }, [foundUser]);

    useEffect(() => {
        const currentUser = getUser();
        console.log('Current user:', currentUser); // Debug log
        if (currentUser.id) {
            getIncome(currentUser.id)
                .then((data) => {
                    console.log('Income data:', data);
                })
                .catch((err) => console.error(err));
        } else {
            console.error('User ID is not available.');
        }
    }, [user]);

    useEffect(() => {
        console.log("Found User in useEffect:", foundUser); // Debugging the user object
        if (foundUser && Number.isInteger(foundUser.id)) {
            console.log("Fetching data for user ID:", foundUser.id);
            getIncome(foundUser.id);
            getExpenses(foundUser.id);
        } else {
            console.error("Invalid user ID:", foundUser.id);
        }
    }, [foundUser]); // Add foundUser as a dependency


    // incomes
    const addIncome = async (income) => {
        try {
            const userId = foundUser.id;
            if (!userId) {
                console.error('Cannot add income: User ID is undefined');
                return;
            }
            const response = await axios.post(`${BASE_URL}add-income`, { ...income, user_id: userId });
            console.log("Income added:", income);
            getIncome(userId);
        } catch (error) {
            setError(error);
            console.error('Error adding income:', error);
        }
    };
    
    const getIncome = async (user_id) => {
        if (!user_id || typeof user_id !== 'number') {
            console.error("Invalid user ID passed to getIncome:", user_id);
            return;
        }
        try {
            console.log("Making API call with user ID:", user_id);
            const response = await axios.get(`${BASE_URL}get-income/${user_id}`);
            response.data.forEach((income) => (income.type = 'income'));
            setIncomes(response.data);
        } catch (error) {
            setError(error);
            console.error("Error fetching income:", error);
        }
    };
    
    const deleteIncome = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}delete-income/${id}`);
            console.log("Income deleted, re-fetching incomes");
            getIncome(foundUser.id); // Pass the correct user ID
        } catch (error) {
            setError(error);
            console.error('Error deleting income:', error);
        }
    };
    
    
    const calculateTotalIncome = () => {
        let totalIncome = 0;
        incomes.forEach(income => {
            totalIncome += parseFloat(income.amount);
        });
        return totalIncome;
    }

    const addExpense = async (expense) => {
        try {
            const userId = foundUser.id;
            if (!userId) {
                console.error('Cannot add expense: User ID is undefined');
                return;
            }
            const response = await axios.post(`${BASE_URL}add-expense`, { ...expense, user_id: userId });
            console.log("Expense added:", expense);
            getExpenses(userId);
        } catch (error) {
            setError(error);
            console.error('Error adding expense:', error);
        }
    };

    const getExpenses = async (user_id) => {
        try {
            if (!user_id) {
                console.error('Cannot fetch expenses: User ID is undefined');
                return;
            }
            console.log("Fetching expenses for user ID:", user_id);
            const response = await axios.get(`${BASE_URL}get-expense/${user_id}`);
            response.data.forEach((expense) => {
                expense.type = 'expense';
            });
            setExpenses(response.data);
        } catch (error) {
            setError(error);
            console.error('Error fetching expenses:', error);
        }
    };
    
    const deleteExpense = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}delete-expense/${id}`);
            console.log("Expense deleted, re-fetching expenses");
            getExpenses(foundUser.id); // Pass the correct user ID
        } catch (error) {
            setError(error);
            console.error('Error deleting expense:', error);
        }
    };
    
    const calculateTotalExpenses = () => {
        let totalExpenses = 0;
        expenses.forEach(expense => {
            totalExpenses += parseFloat(expense.amount);
        });
        return totalExpenses;
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncome,
            deleteIncome,
            calculateTotalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            calculateTotalExpenses,
            incomes,
            expenses,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}