import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    occupation: '',
    goals: []
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', formData);
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="username" label="Username" onChange={handleChange} fullWidth required />
        <TextField name="email" label="Email" type="email" onChange={handleChange} fullWidth required />
        <TextField name="password" label="Password" type="password" onChange={handleChange} fullWidth required />
        <TextField name="age" label="Age" type="number" onChange={handleChange} fullWidth required />
        <TextField name="occupation" label="Occupation" onChange={handleChange} fullWidth />
        <TextField name="goals" label="Goals" onChange={handleChange} fullWidth placeholder="Comma separated goals" />

        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}

        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
    </Container>
  );
};

export default RegisterForm;