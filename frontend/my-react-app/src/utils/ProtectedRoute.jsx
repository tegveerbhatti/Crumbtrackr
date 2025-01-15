import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

const ProtectedRoute = () => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-primary border-r-transparent border-b-primary border-l-transparent"></div>
        <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  // If the user is not authenticated, redirect to login
  if (!user || !user.isAuthenticated) {
    console.log("Redirected back to login.")
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, allow access to the requested route
  return <Outlet />;
};

export default ProtectedRoute;
