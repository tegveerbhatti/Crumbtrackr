import { useState, createContext, useContext, useEffect} from 'react';
import axios from 'axios';
const BASE_URL = "http://localhost:4000/";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            console.log(`${key}: ${value}`);
        }
        
        const initializeUser = async () => {
            const storedUser = window.localStorage.getItem('user');
            console.log("STORED USER: " + storedUser);
            if (storedUser !== null) {
                setUser(JSON.parse(storedUser));
            }
            await checkUser(); 
        };
        initializeUser();
    }, []);

    useEffect(() => {
        if (user !== null) {
            console.log("SETTING USER: " + JSON.stringify(user));
            window.localStorage.setItem('user', JSON.stringify(user));
        } else {
            window.localStorage.removeItem('user');
        }
    }, [user]);

    // useEffect(() => {
    //     checkUser();
    //   }, []);

      const checkUser = async () => {
        try {
            const res = await axios.get('http://localhost:4000/userinfo', { withCredentials: true });
            console.log("GOT USER: " + JSON.stringify(res.data.user));
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    };

    const getUser = () => {
        try{
            const user = window.localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const googleLogin = () => {
        window.location.href = `${BASE_URL}auth/google`; // redirect the user to the backedn

         // this doesnt work because the backend tries to redirect the user to googles oauth endpoint, where cors policy issues occur
         // google oauth endpoint does not all cross origin requests from front end
        // try {
        //     const response = await axios.get(`${BASE_URL}auth/google`);
        //     window.location.href = response.data.url;
        // } catch (error) {
        //     setError(error);
        //     console.log(error);
        // }
    }

    const login = async (user, callback) => {
        try {
            const response = await axios.post(`${BASE_URL}login`, user, { withCredentials: true });
            console.log(response.data);
            setUser({id: response.data.user.id, email: response.data.user.email, isAuthenticated: true});
            // callback is called immediately after setUser but before the state updates
            // the callback function closes over the components scope, including the latest state values and navigate function
            // the closure ensures that the latest stae values are accesible even when navigate is called because they are still in the callback function's scope
            if (callback) callback();
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }

    const register = async (user, callback) => {
        try{
            const response = await axios.post(`${BASE_URL}register`, user);
            setUser({id: response.data.user.id, email: response.data.user.email, isAuthenticated: true});
            if (callback) callback();
        } catch (error) {
            setError(error);
            console.log(error);
        }
    };

    const logout = async () => {
        try{
            const response = await axios.get(`${BASE_URL}logout`, { withCredentials: true });
            console.log(response.data);
            localStorage.clear();
            setUser(null);
            window.location.href = '/login'
        } catch (error) {
            setError(error);
            console.log(error);
        }

    }

    return (
        <AuthContext.Provider value={{ user, login, register, getUser, logout, googleLogin, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => {
    return useContext(AuthContext);
}
