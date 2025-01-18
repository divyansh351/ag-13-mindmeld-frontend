import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    CircularProgress
} from '@mui/material';
import TestLayout from './shared/TestLayout';
import Timer from './shared/Timer';
import { testService } from '../../services/testService';

const FocusTest = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [currentSequence, setCurrentSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [phase, setPhase] = useState('watching'); // watching, responding

    useEffect(() => {
        const fetchTest = async () => {
            const data = await testService.getFocusTest(testId);
            setTest(data);
            setCurrentSequence(data.content.sequence);
        };
        fetchTest();
    }, [testId]);

    useEffect(() => {
        if (phase === 'watching') {
            const timer = setTimeout(() => {
                setPhase('responding');
            }, test?.content.intervalDuration * 1000);
            return () => clearTimeout(timer);
        }
    }, [phase, test]);

    const handleItemClick = (item) => {
        if (phase !== 'responding') return;

        const newSequence = [...userSequence, item];
        setUserSequence(newSequence);

        if (newSequence.length === currentSequence.length) {
            handleComplete(newSequence);
        }
    };

    const handleComplete = async (sequence) => {
        const score = calculateScore(sequence, currentSequence);
        await testService.submitFocusTest(testId, {
            sequence,
            timeTaken: test.content.totalDuration
        });
        navigate('/dashboard');
    };

    if (!test) return null;

    return (
        <TestLayout
            title="Focus Test"
            description={test.description}
        >
            <Timer
                duration={test.content.totalDuration}
                onComplete={() => handleComplete(userSequence)}
            />
            <Box sx={{ textAlign: 'center', my: 4 }}>
                {phase === 'watching' ? (
                    <Typography variant="h2">
                        {currentSequence[Math.floor(Date.now() / 1000) % currentSequence.length]}
                    </Typography>
                ) : (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Recreate the sequence
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            {currentSequence.map((item, index) => (
                                <Button
                                    key={index}
                                    variant="contained"
                                    onClick={() => handleItemClick(item)}
                                >
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </TestLayout>
    );
};

export default FocusTest;