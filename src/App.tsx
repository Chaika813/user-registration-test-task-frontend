import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { HomePage } from './components/HomePage';
import { CssBaseline } from '@mui/material';
import { isAuthenticated } from './utils/auth';

function App() {
    const [authToken, setAuthToken] = useState<null | string>(null);

    return (
        <Router>c
            <CssBaseline />
            <Routes>
                <Route path="/" element={<LoginPage setAuthToken={setAuthToken} authToken={authToken}/>} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/home"
                    element={isAuthenticated() ? <HomePage  setAuthToken={setAuthToken} /> : <Navigate replace to="/" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
