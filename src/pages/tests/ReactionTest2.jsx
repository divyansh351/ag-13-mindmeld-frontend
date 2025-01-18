import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Paper, Fade, LinearProgress } from '@mui/material';

const ReactionTest2 = ({ goBackToMenu }) => {
    const [score, setScore] = useState(0);
    const [testEnded, setTestEnded] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [reactionTime, setReactionTime] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const timeoutRef = useRef(null);
    const maxAttempts = 5;

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const startTest = () => {
        if (testEnded) return;
        setWaiting(true);
        const delay = 1000 + Math.random() * 4000;
        timeoutRef.current = setTimeout(() => {
            setStartTime(Date.now());
        }, delay);
    };

    const handleClick = () => {
        if (!startTime) {
            // Clicked too early
            setReactionTime('Too Early!');
            setWaiting(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setAttempts(prev => prev + 1);
            return;
        }

        const time = Date.now() - startTime;
        setReactionTime(time);
        const gainedScore = Math.max(0, 1000 - time);
        setScore(prev => prev + gainedScore);
        setWaiting(false);
        setStartTime(null);
        setAttempts(prev => prev + 1);

        if (attempts + 1 >= maxAttempts) {
            endTest();
        }
    };

    const endTest = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setTestEnded(true);
        setWaiting(false);
        setStartTime(null);
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
                        Reaction Test
                    </Typography>
                    <Typography sx={{
                        color: '#777',
                        mb: 4
                    }}>
                        Click when the circle turns green
                    </Typography>

                    <Typography sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        fontWeight: 700,
                        color: '#4b4b4b'
                    }}>
                        {attempts}/{maxAttempts}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    gap: 3
                }}>
                    {!testEnded ? (
                        <>
                            <Fade in>
                                <Button
                                    onClick={waiting ? handleClick : startTest}
                                    sx={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: '50%',
                                        bgcolor: startTime ? '#58cc02' : waiting ? '#ff4b4b' : '#1cb0f6',
                                        color: '#fff',
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        transition: 'all 0.2s ease',
                                        animation: startTime ? 'pulse 1s infinite' : 'none',
                                        '@keyframes pulse': {
                                            '0%': { transform: 'scale(1)' },
                                            '50%': { transform: 'scale(1.05)' },
                                            '100%': { transform: 'scale(1)' }
                                        },
                                        '&:hover': {
                                            bgcolor: startTime ? '#46a302' : waiting ? '#ff3b3b' : '#1aa0e1'
                                        }
                                    }}
                                >
                                    {waiting ? 'Wait...' : startTime ? 'Click!' : 'Start'}
                                </Button>
                            </Fade>

                            {reactionTime && (
                                <Typography sx={{
                                    fontSize: '2rem',
                                    fontWeight: 800,
                                    color: typeof reactionTime === 'string' ? '#ff4b4b' : '#1cb0f6'
                                }}>
                                    {typeof reactionTime === 'number' ? `${reactionTime} ms` : reactionTime}
                                </Typography>
                            )}
                        </>
                    ) : (
                        <Box sx={{ textAlign: 'center' }}>
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
                                Score: {Math.round(score)}
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        mt: 2
                    }}>
                        {!testEnded ? (
                            <Button
                                variant="outlined"
                                onClick={endTest}
                                sx={{
                                    color: '#ff4b4b',
                                    borderColor: '#ff4b4b',
                                    '&:hover': {
                                        bgcolor: '#fff0f0',
                                        borderColor: '#ff4b4b'
                                    }
                                }}
                            >
                                End Test
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={goBackToMenu}
                                sx={{
                                    bgcolor: '#58cc02',
                                    fontWeight: 700,
                                    boxShadow: '0 4px 0 #46a302',
                                    '&:hover': {
                                        bgcolor: '#46a302'
                                    }
                                }}
                            >
                                Back to Menu
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default ReactionTest2;