import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, LinearProgress, Fade } from '@mui/material';

const StroopTest = ({ goBackToMenu }) => {
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [testEnded, setTestEnded] = useState(false);
    const [currentWord, setCurrentWord] = useState({ text: '', color: '' });
    const maxAttempts = 20;

    const colors = ['red', 'blue', 'green', 'yellow'];

    useEffect(() => {
        if (attempts >= maxAttempts) {
            setTestEnded(true);
            return;
        }

        const generateStroopWord = () => {
            const text = colors[Math.floor(Math.random() * colors.length)];
            let color;
            do {
                color = colors[Math.floor(Math.random() * colors.length)];
            } while (color === text);
            setCurrentWord({ text, color });
        };

        generateStroopWord();
        const interval = setInterval(generateStroopWord, 2000);
        return () => clearInterval(interval);
    }, [attempts]);

    const handleColorClick = (selectedColor) => {
        if (testEnded) return;
        if (selectedColor === currentWord.color) {
            setScore(prev => prev + 1);
        }
        setAttempts(prev => prev + 1);
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
                        Color Word Test
                    </Typography>
                    <Typography sx={{
                        color: '#777',
                        mb: 4
                    }}>
                        Click the color of the word, not what it spells
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
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 4,
                            gap: 4
                        }}>
                            <Typography sx={{
                                fontSize: '4rem',
                                fontWeight: 800,
                                color: currentWord.color,
                                textTransform: 'uppercase',
                                letterSpacing: 2,
                                animation: 'fadeIn 0.5s ease',
                                '@keyframes fadeIn': {
                                    from: { opacity: 0 },
                                    to: { opacity: 1 }
                                }
                            }}>
                                {currentWord.text}
                            </Typography>

                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 2,
                                width: '100%',
                                maxWidth: 400
                            }}>
                                {colors.map(color => (
                                    <Button
                                        key={color}
                                        onClick={() => handleColorClick(color)}
                                        sx={{
                                            height: 80,
                                            bgcolor: color,
                                            borderRadius: 2,
                                            fontSize: '1.2rem',
                                            fontWeight: 700,
                                            boxShadow: '0 4px 0 rgba(0,0,0,0.2)',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                bgcolor: color,
                                                filter: 'brightness(0.9)',
                                                transform: 'translateY(2px)',
                                                boxShadow: '0 2px 0 rgba(0,0,0,0.2)'
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
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

export default StroopTest;