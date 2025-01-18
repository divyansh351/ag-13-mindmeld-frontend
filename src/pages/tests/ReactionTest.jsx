import React, { useState } from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import CircleClickTest from './CircleClickTest';
import KeypressTest from './KeypressTest';

const ReactionTest = () => {
    const [testType, setTestType] = useState(null);

    const handleComplete = (results) => {
        console.log('Results:', results);
        // Submit to the backend here if required.
    };

    return (
        <Container maxWidth="sm">
            {!testType ? (
                <Paper sx={{ p: 3, mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Select a Test Type
                    </Typography>
                    <Button fullWidth variant="contained" sx={{ mb: 2 }} onClick={() => setTestType('circle')}>
                        Circle Click Test
                    </Button>
                    <Button fullWidth variant="contained" sx={{ mb: 2 }} onClick={() => setTestType('keypress')}>
                        Keypress Test
                    </Button>
                </Paper>
            ) : testType === 'circle' ? (
                <CircleClickTest onComplete={handleComplete} />
            ) : testType === 'keypress' ? (
                <KeypressTest onComplete={handleComplete} />
            ) : (
                <></>
            )}
        </Container>
    );
};

export default ReactionTest;
