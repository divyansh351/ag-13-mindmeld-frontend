import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import TestLayout from './shared/TestLayout';
import Timer from './shared/Timer';
import { testService } from '../../services/testService';

const MemoryTest = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [pairs, setPairs] = useState([]);
    const [selected, setSelected] = useState([]);
    const [matched, setMatched] = useState([]);
    const [showingCards, setShowingCards] = useState(true);

    useEffect(() => {
        const fetchTest = async () => {
            const data = await testService.getMemoryTest(testId);
            setTest(data);
            setPairs(shuffleArray([...data.content.pairs, ...data.content.pairs]));
        };
        fetchTest();
    }, [testId]);

    const handleCardClick = (index) => {
        if (selected.length === 2) return;
        if (selected.includes(index)) return;
        if (matched.includes(index)) return;

        setSelected([...selected, index]);

        if (selected.length === 1) {
            if (pairs[selected[0]] === pairs[index]) {
                setMatched([...matched, selected[0], index]);
                setSelected([]);
            } else {
                setTimeout(() => setSelected([]), 1000);
            }
        }
    };

    const handleComplete = async () => {
        const score = (matched.length / pairs.length) * 100;
        await testService.submitMemoryTest(testId, {
            score,
            timeTaken: test.content.duration - timeLeft
        });
        navigate('/dashboard');
    };

    if (!test) return null;

    return (
        <TestLayout
            title="Memory Test"
            description={test.description}
        >
            <Timer
                duration={test.content.duration}
                onComplete={handleComplete}
            />
            <Grid container spacing={2}>
                {pairs.map((item, index) => (
                    <Grid item xs={3} key={index}>
                        <Card
                            onClick={() => handleCardClick(index)}
                            sx={{
                                cursor: 'pointer',
                                bgcolor: matched.includes(index) ? 'primary.light' :
                                    selected.includes(index) ? 'secondary.light' : 'background.paper'
                            }}
                        >
                            <CardContent>
                                {(selected.includes(index) || matched.includes(index)) && item}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </TestLayout>
    );
};

export default MemoryTest;