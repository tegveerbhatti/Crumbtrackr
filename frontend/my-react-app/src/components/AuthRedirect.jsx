import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AuthRedirect = () => {
    const navigate = useNavigate();
    const query = useQuery();

    useEffect(() => {
        const token = query.get('token');
        if (token) {
            localStorage.setItem('jwtToken', token);
            navigate('/'); // Redirect to the home page or dashboard
        } else {
            navigate('/login'); // Redirect to login if no token found
        }
    }, [navigate, query]);

    return <div>Loading...</div>;
};

export default AuthRedirect;