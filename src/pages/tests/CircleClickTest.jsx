import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Modal,
    Button,
    CircularProgress,
    Paper,
    Fade,
    LinearProgress,
} from '@mui/material';
import { testService } from '../../services/testService';
import { userService } from '../../services/api';

const CircleClickTest = () => {
    const [gameState, setGameState] = useState('IDLE');
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startTime, setStartTime] = useState(null);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bestScore, setBestScore] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const GAME_AREA = {
        width: Math.min(window.innerWidth - 40, 1200), // Max width with padding
        height: Math.min(window.innerHeight - 40, 800), // Max height with padding
    };

    useEffect(() => {
        if (gameState === 'PLAYING' && scores.length < 5) {
            setTimeout(showNewCircle, Math.random() * 2000 + 1000);
        } else if (scores.length === 5) {
            const average = calculateAverageScore();
            if (!bestScore || average < bestScore) {
                setBestScore(average);
            }
            setGameState('COMPLETED');
            setModalOpen(true);
        }
    }, [scores, gameState]);

    const startTest = () => {
        setScores([]);
        setGameState('PLAYING');
    };

    const handleReset = () => {
        setModalOpen(false);
        setGameState('IDLE');
        setScores([]);
    };

    const showNewCircle = () => {
        const circleSize = Math.min(80, GAME_AREA.width * 0.1); // Responsive circle size
        const padding = Math.min(100, GAME_AREA.width * 0.1); // Responsive padding
        setPosition({
            x: Math.random() * (GAME_AREA.width - circleSize - padding * 2) + padding,
            y: Math.random() * (GAME_AREA.height - circleSize - padding * 2) + padding
        });
        setIsVisible(true);
        setStartTime(Date.now());
    };

    const handleClick = () => {
        if (!startTime) return;
        const reactionTime = Date.now() - startTime;
        setScores(prev => [...prev, reactionTime]);
        setIsVisible(false);
        setStartTime(null);
    };

    const calculateAverageScore = () => {
        if (scores.length === 0) return 0;
        return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
              await userService.updateStats({
                            testType: 'memory',
                            score: calculateAverageScore(),
                            time: new Date().getTime()
                        });
            // await testService.submitReactionTest('reaction', {
            //     scores,
            //     averageTime: calculateAverageScore()
            // });
            setLoading(false);
        } catch (error) {
            console.error('Error submitting results:', error);
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f7f7f7',
            overflow: 'hidden'
        }}>
            <Box sx={{
                position: 'relative',
                width: GAME_AREA.width,
                height: GAME_AREA.height,
                bgcolor: '#fff',
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                overflow: 'hidden'
            }}>
                {gameState === 'PLAYING' && (
                    <LinearProgress
                        variant="determinate"
                        value={(scores.length / 5) * 100}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 8,
                            '& .MuiLinearProgress-bar': {
                                bgcolor: '#58cc02'
                            }
                        }}
                    />
                )}

                {gameState === 'IDLE' && (
                    <Fade in>
                        <Box sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: '#fff',
                            gap: 3
                        }}>
                            <Typography variant="h2" sx={{
                                fontWeight: 800,
                                color: '#4b4b4b',
                                mb: 2
                            }}>
                                Test Your Reaction Speed
                            </Typography>
                            <Typography variant="h5" sx={{
                                color: '#777',
                                mb: 4
                            }}>
                                Click the circles as quickly as they appear!
                            </Typography>
                            {bestScore && (
                                <Typography sx={{
                                    color: '#58cc02',
                                    fontWeight: 700,
                                    mb: 4
                                }}>
                                    Best Time: {bestScore}ms
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                onClick={startTest}
                                sx={{
                                    bgcolor: '#58cc02',
                                    fontSize: '1.5rem',
                                    py: 2,
                                    px: 8,
                                    fontWeight: 700,
                                    boxShadow: '0 4px 0 #46a302',
                                    '&:hover': {
                                        bgcolor: '#46a302'
                                    }
                                }}
                            >
                                Start Test
                            </Button>
                        </Box>
                    </Fade>
                )}

                {isVisible && (
                    <Fade in>
                        <Box
                            onClick={handleClick}
                            sx={{
                                position: 'absolute',
                                left: position.x,
                                top: position.y,
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                bgcolor: '#1cb0f6',
                                cursor: 'pointer',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                animation: 'pulse 1.5s infinite',
                                '@keyframes pulse': {
                                    '0%': {
                                        transform: 'scale(1)',
                                        boxShadow: '0 0 0 0 rgba(28,176,246,0.4)'
                                    },
                                    '70%': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 0 0 15px rgba(28,176,246,0)'
                                    },
                                    '100%': {
                                        transform: 'scale(1)',
                                        boxShadow: '0 0 0 0 rgba(28,176,246,0)'
                                    }
                                }
                            }}
                        />
                    </Fade>
                )}

                <Typography sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#4b4b4b'
                }}>
                    {gameState === 'PLAYING' && `${scores.length + 1}/5`}
                </Typography>

            </Box>

            <Modal
                open={modalOpen}
                onClose={handleReset}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Fade in={modalOpen}>
                    <Paper sx={{
                        width: { xs: '90%', sm: 450 },
                        maxHeight: '90vh',
                        m: 2,
                        borderRadius: 4,
                        p: 4,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        boxShadow: '0 8px 0 rgba(0,0,0,0.1)'
                    }}>
                        <Typography variant="h4" sx={{
                            color: '#58cc02',
                            fontWeight: 800,
                            mb: 3
                        }}>
                            Great Job! 🎉
                        </Typography>
                        <Typography variant="h2" sx={{
                            color: '#1cb0f6',
                            fontWeight: 800,
                            mb: 2
                        }}>
                            {calculateAverageScore()} ms
                        </Typography>
                        <Typography sx={{
                            color: '#777',
                            mb: 4
                        }}>
                            Average Reaction Time
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center'
                        }}>
                            <Button
                                variant="outlined"
                                onClick={handleReset}
                                sx={{
                                    borderColor: '#e5e5e5',
                                    color: '#777',
                                    fontWeight: 700,
                                    '&:hover': {
                                        borderColor: '#1cb0f6',
                                        color: '#1cb0f6'
                                    }
                                }}
                            >
                                Try Again
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading}
                                sx={{
                                    bgcolor: '#58cc02',
                                    fontWeight: 700,
                                    boxShadow: '0 4px 0 #46a302',
                                    '&:hover': {
                                        bgcolor: '#46a302'
                                    }
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Submit Score'}
                            </Button>
                        </Box>
                    </Paper>
                </Fade>
            </Modal>
        </Box>
    );
};

export default CircleClickTest;