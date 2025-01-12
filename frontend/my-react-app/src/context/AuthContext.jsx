import { useState, createContext, useContext, useEffect} from 'react';
import axios from 'axios';
const BASE_URL = "http://35.183.64.163:3000//api/";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({email: '', password: '', isAuthenticated: false});
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = window.localStorage.getItem('user');
        if( user !== null) setUser(JSON.parse(user));
    }, []);

    // useEffect(() => {
    //     if(user !== null) window.localStorage.setItem('user', JSON.stringify(user));
    //     console.log(user);
    // }, [user]); // this effect runs whenever the user state changes

    const getUser = () => {
        try{
            const user = window.localStorage.getItem('user');
            return user ? JSON.parse(user) : {email: '', password: '', isAuthenticated: false};
        } catch (error) {
            console.log(error);
            return {email: '', password: '', isAuthenticated: false};
        }
    }

    const login = async (user, callback) => {
        try{
            const response = await axios.post(`${BASE_URL}login`, user);
            console.log(response.data);
            setUser({email: user.email, password: user.password, isAuthenticated: true});
            localStorage.setItem('user', JSON.stringify({email: user.email, password: user.password, isAuthenticated: true}));
             // callback is called immediately after setUser but before the state updates
             // the callback function closes over the components scope, including the latest state values and navigate function
             // the callback immediately executes after setUser is called and schedules a state update
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
            setUser({email: email, password: password, isAuthenticated: true});
            if (callback) callback();
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }

    const logout = () => {
        setUser({email: '', password: '', isAuthenticated: false});
        localStorage.removeItem('user');
        
    }

    return (
        <AuthContext.Provider value={{ user, login, register, getUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => {
    return useContext(AuthContext);
}