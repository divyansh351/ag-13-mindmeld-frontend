import React from 'react';
import { Container, Typography, Tabs, Tab } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const Auth: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Learning App
      </Typography>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      {value === 0 && <LoginForm />}
      {value === 1 && <RegisterForm />}
    </Container>
  );
};

export default Auth;