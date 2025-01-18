import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box, Button, Typography, Container, Paper
} from '@mui/material';
import TestLayout from './shared/TestLayout';
import { testService } from '../../services/testService';

const CircleClickTest = ({ onComplete }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [scores, setScores] = useState([]);

    const generatePosition = useCallback(() => {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (400 - 50);
        return { x, y };
    }, []);

    const startRound = useCallback(() => {
        setIsVisible(false);
        const delay = 1000 + Math.random() * 2000;
        setTimeout(() => {
            setPosition(generatePosition());
            setIsVisible(true);
            setStartTime(Date.now());
        }, delay);
    }, [generatePosition]);

    const handleClick = () => {
        if (!isVisible) return;
        
        const reactionTime = Date.now() - startTime;
        const newScores = [...scores, reactionTime];
        setScores(newScores);

        if (newScores.length >= 5) {
            onComplete({
                type: 'circle',
                scores: newScores,
                average: newScores.reduce((a,b) => a+b) / newScores.length
            });
        } else {
            startRound();
        }
    };

    useEffect(() => {
        startRound();
    }, [startRound]);

    return (
        <Box sx={{
            height: 400,
            width: '100%',
            position: 'relative',
            backgroundColor: '#f5f5f5'
        }}>
            {isVisible && (
                <Box
                    onClick={handleClick}
                    sx={{
                        position: 'absolute',
                        left: position.x,
                        top: position.y,
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        backgroundColor: '#2196f3',
                        cursor: 'pointer',
                        transition: 'transform 0.1s',
                        '&:hover': {
                            transform: 'scale(1.1)'
                        }
                    }}
                />
            )}
            <Typography sx={{ position: 'absolute', top: 10, right: 10 }}>
                Round: {scores.length + 1}/5
            </Typography>
        </Box>
    );
};

const KeypressTest = ({ onComplete }) => {
    const [currentKey, setCurrentKey] = useState('');
    const [isWaiting, setIsWaiting] = useState(true);
    const [startTime, setStartTime] = useState(null);
    const [scores, setScores] = useState([]);
    
    const keys = ['A', 'S', 'D', 'F', 'J', 'K', 'L'];

    const startRound = useCallback(() => {
        setIsWaiting(true);
        setTimeout(() => {
            const newKey = keys[Math.floor(Math.random() * keys.length)];
            setCurrentKey(newKey);
            setStartTime(Date.now());
            setIsWaiting(false);
        }, 1000 + Math.random() * 2000);
    }, []);

    useEffect(() => {
        startRound();
        
        const handleKeyPress = (e) => {
            if (isWaiting || !currentKey) return;
            
            if (e.key.toUpperCase() === currentKey) {
                const reactionTime = Date.now() - startTime;
                const newScores = [...scores, reactionTime];
                setScores(newScores);

                if (newScores.length >= 5) {
                    onComplete({
                        type: 'keypress',
                        scores: newScores,
                        average: newScores.reduce((a,b) => a+b) / newScores.length
                    });
                } else {
                    startRound();
                }
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [currentKey, isWaiting, scores, startTime, startRound, onComplete]);

    return (
        <Box sx={{
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant="h1" sx={{ mb: 4 }}>
                {isWaiting ? '...' : currentKey}
            </Typography>
            <Typography>
                Press the shown key | Round: {scores.length + 1}/5
            </Typography>
        </Box>
    );
};

const ReactionTest = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [testType, setTestType] = useState(null);

    const handleComplete = async (results) => {
        await testService.submitReactionTest(testId, results);
        navigate('/dashboard');
    };

    return (
        <TestLayout title="Reaction Test">
            {!testType ? (
                <Container maxWidth="sm">
                    <Paper sx={{ p: 3, mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Select Test Type
                        </Typography>
                        <Button 
                            fullWidth 
                            variant="contained"
                            sx={{ mb: 2 }}
                            onClick={() => setTestType('circle')}
                        >
                            Circle Click Test
                        </Button>
                        <Button 
                            fullWidth 
                            variant="contained"
                            onClick={() => setTestType('keypress')}
                        >
                            Keypress Test
                        </Button>
                    </Paper>
                </Container>
            ) : testType === 'circle' ? (
                <CircleClickTest onComplete={handleComplete} />
            ) : (
                <KeypressTest onComplete={handleComplete} />
            )}
        </TestLayout>
    );
};

export default ReactionTest;