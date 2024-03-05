import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export interface Props {
    authToken: null | string;
    setAuthToken: (token: null | string) => void
}

export const LoginPage = (props: Props) => {
    const {authToken, setAuthToken} = props
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) { 
          navigate('/home');
        }
      }, [authToken, navigate]);
      

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:4000/api/users/login', { email, password });
            localStorage.setItem('token', data.token);
            setLoading(false);
            setAuthToken(data.token)
        } catch (error: any) {
            setLoading(false);
            setError('Failed to login. Please check your credentials.');
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: 40}}>
            <Typography component="h1" variant="h5">Sign in</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                {loading ? <CircularProgress /> : (
                    <>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: 40}}>Sign In</Button>
                        <Button component={Link} to="/register" fullWidth variant="text">Don't have an account? Sign Up</Button>
                    </>
                )}
            </form>
        </Container>
    );
};
