import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface Props {
    setAuthToken: (token: null | string) => void
}

export const HomePage = (props: Props) => {
    const {setAuthToken} = props
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuthToken(null)
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
