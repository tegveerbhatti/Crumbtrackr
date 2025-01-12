import React from "react";
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { useGlobalContext } from "../context/GlobalContext.jsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function DoughnutChart() {

    const { incomes, expenses } = useGlobalContext();

    const incomeData = {};

    for(const income of incomes){
        const key = income.category;
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
        if(incomeData[formattedKey]){
            incomeData[formattedKey] += parseFloat(income.amount);
        } else {
            incomeData[formattedKey] = parseFloat(income.amount);
        }
    }

    const incomeDoughnutData = {
        labels: Object.keys(incomeData),
        datasets: [{
            label: 'Income',
            data: Object.values(incomeData),
            backgroundColor: [
                '#4CAF50', // Green
                '#2196F3', // Blue
                '#00BCD4', // Cyan
                '#009688', // Teal
                '#CDDC39', // Lime
                '#8BC34A', // Light Green
                '#FFEB3B', // Yellow
                '#FFC107', // Amber
                '#FF9800', // Orange
                '#FF5722'  // Deep Orange
            ],
            hoverOffset: 4
        }]
    };

    const expenseData = {};

    for(const expense of expenses){
        const key = expense.category;
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
        if(expenseData[formattedKey]){
            expenseData[formattedKey] += parseFloat(expense.amount);
        } else {
            expenseData[formattedKey] = parseFloat(expense.amount);
        }
    }


    const expenseDoughnutData = {
        labels: Object.keys(expenseData),
        datasets: [{
            label: 'Expenses',
            data: Object.values(expenseData),
            backgroundColor: [
                '#673AB7', // Deep Purple
                '#3F51B5', // Indigo
                '#E91E63', // Pink
                '#9C27B0', // Purple
                '#F44336', // Red
                '#795548', // Brown
                '#607D8B', // Blue Grey
                '#9E9E9E', // Grey
                '#607D8B', // Blue Grey 
                '#FFEB3B'  // Yellow 
            ],
            hoverOffset: 4
        }]
    };


    return (
        <div className="flex flex-col justify-center items-center bg-[#FCF6F9] border-2 border-white shadow-md rounded-2xl p-4 my-4 text-2xl text-custom-red h-full">
            <div className="flex flex-col justify-around items-center w-full p-4">
                <h2 className="font-semibold text-lg text-blue-500">Income</h2>
                <div className="w-full p-2">
                    <Doughnut data={incomeDoughnutData} options={{ maintainAspectRatio: false }}/>
                </div>
                <h2 className="font-semibold text-lg text-red-500">Expenses</h2>
                <div className="w-full p-2">
                    <Doughnut data={expenseDoughnutData} options={{ maintainAspectRatio: false }}/>
                </div>
            </div>
        </div>
    );
}

export default DoughnutChart;   
