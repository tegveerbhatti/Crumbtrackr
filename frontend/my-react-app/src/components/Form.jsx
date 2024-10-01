import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../context/GlobalContext";
import { useAuthContext } from "../context/AuthContext";

function Form() {
    const { addIncome, getIncome } = useGlobalContext();
    const { user } = useAuthContext();

    const [input, setInput] = React.useState({
        title: "",
        amount: "",
        category: "",
        description: "",
        date: "",
    });

    const { title, amount, category, description, date } = input;

    const handleChange = name => e => {
        setInput({ ...input, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const incomeData = {...input, user_id: user.id};
        console.log(user);
        addIncome(incomeData);
        getIncome({ user_id: user.id });
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
                        <option value="salary">Salary</option>
                        <option value="business">Business</option>
                        <option value="freelancing">Freelancing</option>
                        <option value="investments">Investments</option>
                        <option value="gifts">Gifts</option>
                        <option value="gambling">Gambling</option>
                        <option value="bank">Bank</option>
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
                    <button className="btn btn-primary btn-md">Add Income</button>
                </div>
            </div>
        </form>
    )
}

export default Form;

