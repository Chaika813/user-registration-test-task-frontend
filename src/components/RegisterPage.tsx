import React, { useState } from 'react';
import { Button, TextField, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile_phone: '',
        password: '',
    });
    const { firstname, lastname, email, mobile_phone, password } = formData;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://backend:4000/api/users/register', formData);
            setLoading(false);
            navigate('/');
        } catch (error: any) {
            setLoading(false);
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: 40 }}>
            <Typography component="h1" variant="h5">Sign up</Typography>
            {error && <Alert severity="error" style={{ marginTop: '20px' }}>{error}</Alert>}
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="First Name"
                    name="firstname"
                    value={firstname}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    value={lastname}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Mobile Phone"
                    name="mobile_phone"
                    value={mobile_phone}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{ marginTop: '40px' }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                </Button>
                <Button
                    component={Link}
                    to="/"
                    fullWidth
                    variant="text"
                    style={{ marginTop: '10px' }}
                >
                    Already have an account? Sign in
                </Button>
            </form>
        </Container>
    );
};
