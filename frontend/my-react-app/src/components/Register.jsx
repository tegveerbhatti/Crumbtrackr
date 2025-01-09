import React from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext";

function Register() {
    const { register, googleLogin } = useAuthContext();
    const navigate = useNavigate();

    const [input, setInput] = React.useState({
        email: "",
        password: "",
    });

    const { email, password } = input;


    const handleChange = name => e => {
        setInput({ ...input, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register(input);
        navigate('/login');
        setInput({
            email: "",
            password: "",
        });
    }

    const handleGoogleLogin = async () => {
      await googleLogin();
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-100">
          <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <p className="text-center mb-6">Hi, Welcome to Crumbtrackr 👋</p>
            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-2"/>
            Sign up with Google
            </button>
            <div className="flex items-center justify-center mb-6">
              <div className="border-t border-gray-300 w-1/5"></div>
              <p className="text-gray-500 mx-4">or</p>
              <div className="border-t border-gray-300 w-1/5"></div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700" >Email</label>
                <input type="email" name="email" id="email" value={email} onChange={handleChange('email')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g. johndoe@gmail.com" />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700" >Password</label>
                <input type="password" name="password" id="password" value={password} onChange={handleChange('password')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your password" />
              </div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Have an account? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</a>
            </p>
          </div>
        </div>
    );
}

export default Register;