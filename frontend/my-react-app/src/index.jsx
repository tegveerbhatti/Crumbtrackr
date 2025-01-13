import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/styles.css';
import { GlobalProvider } from './context/GlobalContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Router>
      <AuthProvider>
        <GlobalProvider>
            <App />
        </GlobalProvider>
      </AuthProvider>
      </Router>
    </React.StrictMode>
    ,
  )
  