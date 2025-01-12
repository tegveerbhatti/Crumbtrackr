import React from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import HistoryItem from "./HistoryItem";


function History() {
    const { incomes, expenses } = useGlobalContext();
    var transactions = [...incomes, ...expenses];
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorted to show the most recent first
    transactions = transactions.slice(0, 6); // Only show the 6 most recent transactions
    

    return (
        <div className="flex flex-col items-center">
            <ul className="w-full">
                {transactions.map((transaction) => {
                    const { id, title, amount, category, description, date, type } = transaction;
                    return (
                        <li key={id} className="bg-gray-100 my-2 rounded-lg shadow-md">
                            <HistoryItem
                                title={title}
                                amount={amount}
                                type={type}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default History;