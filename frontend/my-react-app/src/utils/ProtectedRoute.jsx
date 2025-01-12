import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

const ProtectedRoute = () => {
  const { user, loading } = useAuthContext();
  console.log(user);

  if (loading) {
    return (<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-primary border-r-transparent border-b-primary border-l-transparent"></div>
        <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    </div>);  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;