import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// const BASE_URL = "http://localhost:4000/";
const BASE_URL = "https://api.crumbtrackr.com/auth/";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Simplified user state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const useIdleTimeout = (timeout = 300000, onTimeout) => {
    useEffect(() => {
      let timer;

      const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(onTimeout, timeout); // Call onTimeout after timeout period
      };

      const handleActivity = () => resetTimer();

      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keypress", handleActivity);
      window.addEventListener("scroll", handleActivity);

      resetTimer();

      return () => {
        clearTimeout(timer);
        window.removeEventListener("mousemove", handleActivity);
        window.removeEventListener("keypress", handleActivity);
        window.removeEventListener("scroll", handleActivity);
      };
    }, [timeout, onTimeout]);
  };

  // Initialize user from localStorage or sessionStorage on app load
  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true); // Indicate loading state
        const storedUser = sessionStorage.getItem("user") || localStorage.getItem("user");
  
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.isAuthenticated) {
            console.log("Restoring user from storage:", parsedUser);
            setUser(parsedUser); // Restore user from storage
            return;
          }
        }
  
        // Fetch Google OAuth user if no stored user exists
        const response = await axios.get(`${BASE_URL}userinfo`, { withCredentials: true });
        if (response.data.user) {
          const userData = {
            id: response.data.user.id,
            email: response.data.user.email,
            isAuthenticated: true,
          };
          console.log("Fetched Google user:", userData);
          setUser(userData);
          sessionStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (err) {
        console.error("Error initializing user:", err.message);
      } finally {
        setLoading(false); // Ensure loading is complete
      }
    };
  
    initializeUser();
  }, []);
  

  // Fetch user data from the server (Google Login)
  const fetchGoogleUser = async () => {
    try {
      // Avoid fetching Google user if a user is already authenticated
      if (user) return;
  
      const response = await axios.get(`${BASE_URL}userinfo`, { withCredentials: true });
      if (response.data.user) {
        const userData = {
          id: response.data.user.id,
          email: response.data.user.email,
          isAuthenticated: true,
        };
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("No user data found");
      }
    } catch (err) {
      console.error("Failed to fetch Google user:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ensure fetchGoogleUser is called only if user is not already authenticated
  useEffect(() => {
    if (!user) {
      fetchGoogleUser();
    }
  }, [user]);

  

  const login = async (credentials) => {
    setError(null); // Clear any previous errors
    setLoading(true);
  
    try {
      const response = await axios.post(`${BASE_URL}login`, credentials, { withCredentials: true });
      if (response.data.success) {
        const userData = {
          id: response.data.user.id,
          email: response.data.user.email,
          isAuthenticated: true,
        };
        console.log("Local login successful:", userData);
        setUser(userData); // Update state
        sessionStorage.setItem("user", JSON.stringify(userData)); // Persist session
        await new Promise((resolve) => setTimeout(resolve, 0)); // Small delay to allow React updates
        navigate("/dashboard");
        return true;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false); // Clear loading state
    }
  };

  const register = async (credentials, callback) => {
    try {
      const response = await axios.post(`${BASE_URL}register`, credentials);
      if (response.data.user) {
        const userData = { email: response.data.user.email, isAuthenticated: true };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        if (callback) callback(); // Optional callback for navigation
      } else {
        throw new Error(response.data.error || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
      console.error('Registration error:', err);
    }
  };

  const googleLogin = async () => {
    try {
      window.location.href = `${BASE_URL}auth/google`; // Redirect to Google OAuth endpoint
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message || "An error occurred during Google login");
    }
  };

  const logout = () => {
    console.log("Logging out...");
    setUser(null); // Clear user state
    sessionStorage.removeItem("user"); // Remove session data
    localStorage.removeItem("user"); // Ensure no stale data
    setError(null); // Clear error state
    setLoading(false); // Reset loading state
  };

  const getUser = () => {
    return user || { id: null, email: '', isAuthenticated: false };
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getUser, error, loading, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
