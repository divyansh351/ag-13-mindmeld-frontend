import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Button,
    Typography
} from '@mui/material';
import TestLayout from './shared/TestLayout';
import Timer from './shared/Timer';
import { testService } from '../../services/testService';

const AttentionTest = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [symbols, setSymbols] = useState([]);
    const [responses, setResponses] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);

    useEffect(() => {
        const fetchTest = async () => {
            const data = await testService.getAttentionTest(testId);
            setTest(data);
            generateSymbols(data.content);
        };
        fetchTest();
    }, [testId]);

    const generateSymbols = (content) => {
        const allSymbols = [
            ...content.targetSymbols,
            ...content.distractors
        ];
        setSymbols(shuffleArray(allSymbols));
    };

    const handleSymbolClick = (symbol) => {
        if (test.content.targetSymbols.includes(symbol)) {
            setResponses([...responses, symbol]);
        }
    };

    const handleComplete = async () => {
        const score = calculateScore(responses, test.content.targetSymbols);
        await testService.submitAttentionTest(testId, {
            responses,
            timeTaken: test.content.duration
        });
        navigate('/dashboard');
    };

    if (!test) return null;

    return (
        <TestLayout
            title="Attention Test"
            description={test.description}
        >
            <Timer
                duration={test.content.duration}
                onComplete={handleComplete}
            />
            <Grid container spacing={2}>
                {symbols.map((symbol, index) => (
                    <Grid item xs={3} key={index}>
                        <Button
                            variant="outlined"
                            onClick={() => handleSymbolClick(symbol)}
                            sx={{ fontSize: '2rem', minHeight: 100 }}
                        >
                            {symbol}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">
                    Found: {responses.length}
                </Typography>
            </Box>
        </TestLayout>
    );
};

export default AttentionTest;