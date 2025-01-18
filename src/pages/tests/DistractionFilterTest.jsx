import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Grid, LinearProgress, Fade } from '@mui/material';

const DistractionFilterTest = ({ goBackToMenu }) => {
    const [score, setScore] = useState(0);
    const [testEnded, setTestEnded] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [items, setItems] = useState([]);
    const maxAttempts = 15;

    const targetSymbol = '★';
    const distractorSymbol = '☆';
    const targetCount = 1;
    const distractorCount = 14;

    useEffect(() => {
        const targets = Array(targetCount).fill(targetSymbol);
        const distractors = Array(distractorCount).fill(distractorSymbol);
        const shuffledItems = shuffle([...targets, ...distractors]);
        setItems(shuffledItems);
    }, [attempts]);

    const handleClick = (symbol) => {
        if (testEnded) return;
        if (symbol === targetSymbol) {
            setScore(prev => prev + 1);
        }
        setAttempts(prev => {
            const newAttempts = prev + 1;
            if (newAttempts >= maxAttempts) {
                setTestEnded(true);
            }
            return newAttempts;
        });
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #58cc02 0%, #1cb0f6 100%)',
            p: 3
        }}>
            <Paper elevation={6} sx={{
                width: '95%',
                maxWidth: 800,
                minHeight: 600,
                borderRadius: 4,
                overflow: 'hidden',
                bgcolor: '#fff',
                boxShadow: '0 8px 0 rgba(0,0,0,0.1)'
            }}>
                <LinearProgress
                    variant="determinate"
                    value={(attempts / maxAttempts) * 100}
                    sx={{
                        height: 8,
                        bgcolor: '#e5e5e5',
                        '& .MuiLinearProgress-bar': {
                            bgcolor: '#58cc02'
                        }
                    }}
                />

                <Box sx={{
                    p: 4,
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    <Typography variant="h4" sx={{
                        color: '#4b4b4b',
                        fontWeight: 800,
                        mb: 1
                    }}>
                        Symbol Search Test
                    </Typography>
                    <Typography sx={{
                        color: '#777',
                        mb: 4
                    }}>
                        Find all {targetSymbol} symbols
                    </Typography>

                    <Typography sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        fontWeight: 700,
                        color: '#4b4b4b'
                    }}>
                        Score: {score}/{attempts}
                    </Typography>
                </Box>

                {!testEnded ? (
                    <Fade in>
                        <Box sx={{
                            p: 4
                        }}>
                            <Grid container spacing={2} justifyContent="center">
                                {items.map((symbol, index) => (
                                    <Grid item key={index}>
                                        <Button
                                            onClick={() => handleClick(symbol)}
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                fontSize: '2rem',
                                                bgcolor: '#fff',
                                                color: '#4b4b4b',
                                                border: '2px solid #e5e5e5',
                                                borderRadius: 2,
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    bgcolor: '#f7f7f7',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                                }
                                            }}
                                        >
                                            {symbol}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Fade>
                ) : (
                    <Fade in>
                        <Box sx={{
                            textAlign: 'center',
                            p: 4
                        }}>
                            <Typography variant="h3" sx={{
                                color: '#58cc02',
                                fontWeight: 800,
                                mb: 2
                            }}>
                                Test Complete! 🎉
                            </Typography>
                            <Typography variant="h4" sx={{
                                color: '#1cb0f6',
                                fontWeight: 800,
                                mb: 4
                            }}>
                                Score: {score}/{attempts}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={goBackToMenu}
                                sx={{
                                    bgcolor: '#58cc02',
                                    fontSize: '1.2rem',
                                    py: 1.5,
                                    px: 4,
                                    fontWeight: 700,
                                    boxShadow: '0 4px 0 #46a302',
                                    '&:hover': {
                                        bgcolor: '#46a302'
                                    }
                                }}
                            >
                                Back to Menu
                            </Button>
                        </Box>
                    </Fade>
                )}
            </Paper>
        </Box>
    );
};

const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export default DistractionFilterTest;