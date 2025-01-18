import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.login(formData);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            setError('Invalid credentials');
        }
    };

    return (
        <Container
            component="main"
            sx={{
                position: 'relative',
                height: '100vh', // Full viewport height
                width: '100vw',  // Full viewport width
                backgroundImage: 'url(/login-bg.png)', // Background image path
                backgroundSize: 'cover', // Ensure the image covers the entire container
                backgroundPosition: 'center', // Center the image
                backgroundRepeat: 'no-repeat', // Prevent tiling
                display: 'flex',
                justifyContent: 'center', // Horizontally center
                alignItems: 'center', // Vertically center
                overflow: 'hidden', // Prevent scrollbars if any
                backdropFilter: 'blur(10px)', // Optional blur effect
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent form background
                    boxShadow: 3,
                    width: '100%',
                    maxWidth: 400, // Max width for the form
                }}
            >
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                    Welcome Back!
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link href="/register" variant="body2">
                            Don&apos;t have an account? Sign Up
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
    
};

export default Login;
