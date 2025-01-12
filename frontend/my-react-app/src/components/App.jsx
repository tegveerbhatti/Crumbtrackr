import React, { useState } from 'react';
import Main from './Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Income from './Income';
import Expenses from './Expenses';
import Login from './Login';
import Register from './Register';
import { useGlobalContext } from '../context/GlobalContext';
import ProtectedRoute from '../utils/ProtectedRoute.jsx';
import AuthRedirect from './AuthRedirect';


function App() {

    const global = useGlobalContext();

  return (
        <BrowserRouter>
        <div className = "App bg-color-app">
            <Main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/auth-redirect" element={<AuthRedirect />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/expenses" element={<Expenses />} />
                    </Route>
                </Routes>
            </Main>
        </div>
        </BrowserRouter>
  );
}

export default App;