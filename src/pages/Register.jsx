import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Link,
    Grid
} from '@mui/material';
import { authService } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(formData);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            setError('Registration failed');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
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
                    Create Account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
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
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;