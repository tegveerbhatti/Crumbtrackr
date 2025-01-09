import React from "react";
import InnerLayout from './InnerLayout';
import LineChart from './LineChart';
import DoughnutChart from './DoughnutChart';
import History from './History';
import Navigation from './Navigation';
import { useGlobalContext } from "../context/GlobalContext";

function Dashboard() {
    const { calculateTotalExpenses, calculateTotalIncome } = useGlobalContext();

    return (
        <div>
            <Navigation />
            <InnerLayout>
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                
                <div className="w-full mb-4">
                    <LineChart />
                </div>
                
                <div className="flex justify-around items-center w-full bg-white shadow-lg p-6 rounded-lg mb-8">
                    <div className="text-center px-4 py-2">
                        <h2 className="font-semibold text-lg text-blue-500">Total Income</h2>
                        <p className="text-xl font-bold text-green-500">
                            ${calculateTotalIncome()}
                        </p>
                    </div>
                    <div className="text-center px-4 py-2">
                        <h2 className="font-semibold text-lg text-red-500">Total Expenses</h2>
                        <p className="text-xl font-bold text-red-500">
                            ${calculateTotalExpenses()}
                        </p>
                    </div>
                    <div className="text-center px-4 py-2">
                        <h2 className="font-semibold text-lg text-gray-700">Balance</h2>
                        <p className="text-xl font-bold text-gray-800">
                            ${calculateTotalIncome() - calculateTotalExpenses()}
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start w-full">
                    <div className="w-full md:w-1/2 p-2">
                        <DoughnutChart />
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                        <h2 className="font-semibold text-lg">Transaction History</h2>
                        <History />
                    </div>
                </div>
            </InnerLayout>
        </div>
    );
}

export default Dashboard;
