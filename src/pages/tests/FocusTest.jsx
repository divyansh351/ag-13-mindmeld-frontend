import React, { useState } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';

import ContinuousAttentionTest from './ContinuousAttentionTest';
import StroopTest from './StroopTest';
import DistractionFilterTest from './DistractionFilterTest';
import ReactionTest2 from './ReactionTest2';

const testTypes = {
    CONTINUOUS: 'continuous',
    STROOP: 'stroop',
    DISTRACTION: 'distraction',
    REACTION: 'reaction',
};

const FocusTest = () => {
    const [currentTest, setCurrentTest] = useState(null);

    // Function passed to each test so it can go back to the menu
    const goBackToMenu = () => {
        setCurrentTest(null);
    };

    const renderTest = () => {
        switch (currentTest) {
            case testTypes.CONTINUOUS:
                return <ContinuousAttentionTest goBackToMenu={goBackToMenu} />;
            case testTypes.STROOP:
                return <StroopTest goBackToMenu={goBackToMenu} />;
            case testTypes.DISTRACTION:
                return <DistractionFilterTest goBackToMenu={goBackToMenu} />;
            case testTypes.REACTION:
                return <ReactionTest2 goBackToMenu={goBackToMenu} />;
            default:
                // No test selected: show the menu
                return (
                    <Box
                        sx={{
                            width: '100%',
                            minHeight: '400px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '20px 0',
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            Select a Test
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setCurrentTest(testTypes.CONTINUOUS)}
                            sx={{ m: 1 }}
                        >
                            Continuous Attention
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setCurrentTest(testTypes.STROOP)}
                            sx={{ m: 1 }}
                        >
                            Stroop
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setCurrentTest(testTypes.DISTRACTION)}
                            sx={{ m: 1 }}
                        >
                            Distraction Filter
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setCurrentTest(testTypes.REACTION)}
                            sx={{ m: 1 }}
                        >
                            Reaction
                        </Button>
                    </Box>
                );
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ padding: '20px' }}>
                <Typography variant="h3" gutterBottom>
                    Focus Test Suite
                </Typography>

                {/* Render whichever test is selected; otherwise show the menu */}
                {renderTest()}
            </Box>
        </Container>
    );
};

export default FocusTest;
