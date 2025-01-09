import React, { useEffect } from "react";
import InnerLayout from './InnerLayout';
import { useGlobalContext } from "/Users/tegveerbhatti/Desktop/Projects/crumbtrackr/frontend/my-react-app/src/context/GlobalContext.jsx";
import { useAuthContext } from "/Users/tegveerbhatti/Desktop/Projects/crumbtrackr/frontend/my-react-app/src/context/AuthContext.jsx";
import Form from './Form';
import IncomeItem from './IncomeItem';
import Navigation from './Navigation';

function Income() {
    const { addIncome, getIncome, deleteIncome, incomes, calculateTotalIncome } = useGlobalContext(); 
    const { user } = useAuthContext();

    useEffect(() => {
        getIncome({ user_id: user.id});
    }, []);

    return (
        <div>
            <Navigation />
            <InnerLayout>
                <h1 className="text-2xl font-bold mb-4">Income</h1>
                <h2 className="flex justify-center items-center bg-color-app border-2 border-white shadow-md rounded-[20px] p-4 my-4 text-2xl gap-2">Total Income: <span className="text-color-green text-lg">${calculateTotalIncome()}</span></h2>
                <div className="flex gap-8">
                    <div className="w-1/3">
                        <Form />
                    </div>
                    <div className="w-2/3">
                        <div className="space-y-4">
                            {incomes.map((income) => {
                                const { id, title, amount, category, description, date } = income;
                                return (
                                    <IncomeItem
                                        key={id}
                                        id={id}
                                        title={title}
                                        amount={amount}
                                        category={category}
                                        description={description}
                                        date={date.split('T')[0]}
                                        type='income'
                                        deleteItem={deleteIncome}
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

export default Income;
