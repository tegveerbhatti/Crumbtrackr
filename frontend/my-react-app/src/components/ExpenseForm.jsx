import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../context/GlobalContext";
import { useAuthContext } from "../context/AuthContext";

function ExpenseForm() {
    const { addExpense, getExpenses } = useGlobalContext();
    const [input, setInput] = React.useState({
        title: "",
        amount: "",
        category: "",
        description: "",
        date: "",
    });
    const { user }  = useAuthContext();


    const { title, amount, category, description, date } = input;

    const handleChange = name => e => {
        setInput({ ...input, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const expenseData = {...input, user_id: user.id};
        addExpense(expenseData);
        getExpenses();
        setInput({
            title: "",
            amount: "",
            category: "",
            description: "",
            date: "",
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md space-y-4">
                <div className="input-control">
                    <input type="text" className="input input-bordered w-full text-gray-700" value={title} placeholder="Title" onChange={handleChange('title')} />
                </div>
                <div className="input-control">
                    <input type="number" className="input input-bordered w-full text-gray-700" placeholder="Amount" value={amount} name={'amount'} onChange={handleChange('amount')} />
                </div>
                <div className="selects input-control">
                    <select required value={category} name="category" id="category" onChange={handleChange('category')} className="select select-bordered w-full text-gray-700">
                        <option value="" disabled>Select Option</option>
                        <option value="food">Food</option>
                        <option value="clothes">Clothes</option>
                        <option value="bills">Bills</option>
                        <option value="transport">Transportation</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="input-control">
                    <textarea className="textarea textarea-bordered w-full text-gray-700" name='description' value={description} placeholder="Note" id="description" cols="30" rows="4" onChange={handleChange('description')}></textarea>
                </div>
                <div className="input-control">
                    <DatePicker
                        id="date"
                        type="date"
                        placeholderText="Date"
                        selected={date}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => {
                            setInput({ ...input, date: date });
                        }}
                        className="input input-bordered w-full text-gray-700"
                    />
                </div>
                <div className="submit-btn text-center">
                    <button className="btn btn-primary btn-md">Add Expense</button>
                </div>
            </div>
        </form>
    )
}

export default ExpenseForm;

