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

import { Line } from 'react-chartjs-2';
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

function LineChart() {

    const { incomes, expenses } = useGlobalContext();
    const transactions = [...incomes, ...expenses];
    transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

    const monthlyBal = {};
    let totalBal = 0;

    if (transactions.length > 0) {
        const startDate = new Date(transactions[0].date);
        const endDate = new Date(transactions[transactions.length - 1].date);

        // Ensure we include the last month
        endDate.setMonth(endDate.getMonth() + 1);

        for (let date = new Date(startDate); date <= endDate; date.setMonth(date.getMonth() + 1)) { // iterate through all months between the first and last transaction
            const key = `${date.getMonth() + 1}/${date.getFullYear()}`;
            
            const monthlyTransactions = transactions.filter(t => { 
                const tDate = new Date(t.date);
                return tDate.getMonth() === date.getMonth() && tDate.getFullYear() === date.getFullYear(); // return subarray of transactions that match the month and year
            });

            for (const transaction of monthlyTransactions) { // iterate through the subarray of transactions
                if (transaction.type === 'income') {
                    totalBal += parseFloat(transaction.amount);
                } else if (transaction.type === 'expense') {
                    totalBal -= parseFloat(transaction.amount);
                }
            }

            monthlyBal[key] = totalBal;
        }
    }

    const dates = Object.keys(monthlyBal);

    const balances = Object.values(monthlyBal);

    const lineData = {
        labels: dates,
        datasets: [{
            label: 'Balance',
            data: balances,
            borderColor: '#cd0886',
            backgroundColor: '#cd0886',
            fill: false,
            tension: 0.2
        }]
    };


    return (
        <div className="flex flex-col justify-center items-center bg-[#FCF6F9] border-2 border-white shadow-lg rounded-2xl p-6 my-6 text-xl text-custom-red h-auto">
            <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto p-6">
                <Line data={lineData} options={{ responsive: true }}/>
            </div>
        </div>
    );
}

export default LineChart;   