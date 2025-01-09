import React, { useState, useContext,  createContext, useEffect, useRef } from 'react';  
import axios from 'axios';
import { useAuthContext } from './AuthContext';
const BASE_URL = "http://localhost:3000/api/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const { getUser } = useAuthContext();
    const user = getUser();    


    useEffect(() => {
        console.log(user.id);
        if(user && Number.isInteger(user.id) ) getIncome(user.id);

        getExpenses();
    }, []);

    // incomes
    const addIncome = async (income) => {
        try{
            const response = await axios.post(`${BASE_URL}add-income`, income);
            console.log(income);
            getIncome(income.user_id);
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }
    const getIncome = async (user_id) => {
        try{
            console.log("USER ID IN GLOBAL CONTEXT: " + user_id);
            const response = await axios.get(`${BASE_URL}get-income/${user_id}`);
            for(const income of response.data){
                income.type = 'income';
            }
            setIncomes(response.data);
            // for(const income of incomes){
            //     console.log("INCOME: " + income.title);
            // }
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }
    
    const deleteIncome = async (id) => {
        try{
            const response = await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncome();
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }
    
    const calculateTotalIncome = () => {
        let totalIncome = 0;
        incomes.forEach(income => {
            totalIncome += parseFloat(income.amount);
        });
        return totalIncome;
    }

    // expenses
    const addExpense = async (income) => {
        try{
            const response = await axios.post(`${BASE_URL}add-expense`, income);
            getExpenses();
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }
    const getExpenses = async () => {
        try{
            const response = await axios.get(`${BASE_URL}get-expense`);
            for(const expense of response.data){
                expense.type = 'expense';
            }
            setExpenses(response.data);
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }
    
    const deleteExpense = async (id) => {
        try{
            const response = await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }
    
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