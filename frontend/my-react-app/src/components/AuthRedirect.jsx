import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext'; 
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AuthRedirect = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const { setUser} = useAuthContext();

    // useEffect hook to verify token from google login
    useEffect(() => {
        const verifyToken = async () => {
            const token = query.get('token');
            console.log(token);
            if (token) { // verify token
                try {
                    const response = await axios.post('http://localhost:4000/verify-token', { token }, { withCredentials: true });
                    setUser({id: response.data.user.id, email: response.data.user.email, isAuthenticated: true});
                    localStorage.setItem('jwtToken', token);
                    navigate('/dashboard');
                } catch (error) {
                    console.error('Token verification failed:', error);
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        verifyToken();
    }, [navigate, query, setUser]);

    return (<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-primary border-r-transparent border-b-primary border-l-transparent"></div>
        <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    </div>);
};

export default AuthRedirect;