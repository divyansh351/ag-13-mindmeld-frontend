import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography
} from '@mui/material';
import TestLayout from './shared/TestLayout';
import { testService } from '../../services/testService';

const ReactionTest = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [state, setState] = useState('waiting'); // waiting, ready, testing, complete
    const [startTime, setStartTime] = useState(null);
    const [reactions, setReactions] = useState([]);

    useEffect(() => {
        const fetchTest = async () => {
            const data = await testService.getReactionTest(testId);
            setTest(data);
        };
        fetchTest();
    }, [testId]);

    useEffect(() => {
        if (state === 'ready') {
            const delay = Math.random() *
                (test.content.delayMax - test.content.delayMin) +
                test.content.delayMin;

            const timer = setTimeout(() => {
                setState('testing');
                setStartTime(Date.now());
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [state, test]);

    const handleClick = () => {
        if (state === 'waiting') {
            setState('ready');
        } else if (state === 'testing') {
            const reactionTime = Date.now() - startTime;
            const newReactions = [...reactions, reactionTime];
            setReactions(newReactions);

            if (newReactions.length >= test.content.trials) {
                handleComplete(newReactions);
            } else {
                setState('ready');
            }
        }
    };

    const handleComplete = async (finalReactions) => {
        await testService.submitReactionTest(testId, {
            reactions: finalReactions,
            timeTaken: Math.sum(...finalReactions)
        });
        navigate('/dashboard');
    };

    if (!test) return null;

    return (
        <TestLayout
            title="Reaction Test"
            description={test.description}
        >
            <Box
                sx={{
                    height: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleClick}
                    sx={{
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        bgcolor: state === 'testing' ? 'success.main' : 'grey.300'
                    }}
                >
                    {state === 'waiting' ? 'Start' :
                        state === 'ready' ? 'Wait...' :
                            state === 'testing' ? 'Click!' : 'Complete'}
                </Button>
                <Typography sx={{ mt: 4 }}>
                    Trial {reactions.length + 1} of {test?.content.trials}
                </Typography>
            </Box>
        </TestLayout>
    );
};

export default ReactionTest;