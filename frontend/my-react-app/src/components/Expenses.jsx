import React, { useEffect } from "react";
import InnerLayout from './InnerLayout';
import { useGlobalContext } from "/Users/tegveerbhatti/Desktop/Projects/crumbtrackr/frontend/my-react-app/src/context/GlobalContext.jsx";
import ExpenseForm from './ExpenseForm';
import IncomeItem from './IncomeItem';
import Navigation from './Navigation';

function Expenses() {
    const { getExpenses, deleteExpense, expenses, calculateTotalExpenses } = useGlobalContext(); 

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <div>
            <Navigation />
            <InnerLayout>
                <h1 className="text-2xl font-bold mb-4">Expenses</h1>
                <h2 className="flex justify-center items-center bg-color-app border-2 border-white shadow-md rounded-[20px] p-4 my-4 text-2xl gap-2">Total Expenses: <span className="text-color-delete text-lg">${calculateTotalExpenses()}</span></h2>
                <div className="flex gap-8">
                    <div className="w-1/3">
                        <ExpenseForm />
                    </div>
                    <div className="w-2/3">
                        <div className="space-y-4">
                            {expenses.map((income) => {
                                const { id, title, amount, category, description, date } = income;
                                console.log(date);
                                return (
                                    <IncomeItem
                                        key={id}
                                        id={id}
                                        title={title}
                                        amount={amount}
                                        category={category}
                                        description={description}
                                        date={date.split('T')[0]}
                                        type='expense'
                                        deleteItem={deleteExpense}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </div>
    );
}

export default Expenses;
