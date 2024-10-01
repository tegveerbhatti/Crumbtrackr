import { useEffect } from 'react';
import axios from 'axios';

export const useCheckAuth = (setUser, setLoading) => {
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get('http://localhost:4000/userinfo', { withCredentials: true });
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, [setUser, setLoading]);
};