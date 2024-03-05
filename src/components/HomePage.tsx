import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: 40}}>
            <Typography component="h1" variant="h5" style={{ marginBottom: '20px' }}>
                Welcome to our App, have a great day!
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
            </Button>
        </Container>
    );
};
