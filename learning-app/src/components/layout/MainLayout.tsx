import React from 'react';
import { Container } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Container>
            <Header />
            <Sidebar />
            <main>
                {children}
            </main>
        </Container>
    );
};

export default MainLayout;