import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Grid, Button, Typography, Card, Dialog,
    DialogTitle, DialogContent, DialogActions,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TestLayout from './shared/TestLayout';
import { testService } from '../../services/testService';

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.5),
    height: '60px',
    width: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '8px',
    '&:hover': {
        transform: 'scale(1.02)',
    },
}));

const TestButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    minWidth: '200px',
    height: '50px',
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
    '&:hover': {
        backgroundColor: '#45A049',
    },
}));

const WrapperBox = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
}));

const ProblemTest = () => {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState('selection');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [problem, setProblem] = useState({});
    const [options, setOptions] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isGameEnded, setIsGameEnded] = useState(false);

    const generateProblem = () => {
        const num1 = Math.floor(Math.random() * 50) + 1; // Increased range to 1-100
        const num2 = Math.floor(Math.random() * 50) + 1; // Increased range to 1-100
        const operators = ['+', '-', '*'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        const correctAnswer = eval(`${num1} ${operator} ${num2}`);
        const options = [correctAnswer];
        while (options.length < 4) {
            const option = Math.floor(Math.random() * 200) + 1; // Increased range to 1-200
            if (!options.includes(option)) {
                options.push(option);
            }
        }
        setProblem({ num1, num2, operator });
        setOptions(shuffle(options));
    };

    const shuffle = (array) => {
        let currentIndex = array.length;
        while (currentIndex !== 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    useEffect(() => {
        let timer;
        if (gameState === 'playing' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !isGameEnded) {
            setIsGameEnded(true);
            setShowResults(true);
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft, isGameEnded]);

    const startTest = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(30);
        setIsGameEnded(false);
        generateProblem();
    };

    const handleOptionClick = (option) => {
        if (isGameEnded) return;

        const correctAnswer = eval(`${problem.num1} ${problem.operator} ${problem.num2}`);
        if (option === correctAnswer) {
            setScore((prev) => prev + 1);
        }
        generateProblem();
    };

    const handleTestComplete = async () => {
        setLoading(true);
        try {
            await testService.submitAttentionTest('problem-test', {
                score,
                timeSpent: 30,
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error submitting test:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderTestSelection = () => (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom align="center" sx={{ color: '#333' }}>
                    Select Problem Test
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TestButton
                    variant="contained"
                    onClick={startTest}
                    fullWidth
                >
                    Start Problem Test 🧮
                </TestButton>
            </Grid>
        </Grid>
    );

    const renderGame = () => (
        <Box textAlign="center" sx={{ maxWidth: '300px', margin: '0 auto' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#333' }}>
                Score: {score} | Time: {timeLeft}s
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: '#333', mb: 1 }}>
                {problem.num1} {problem.operator} {problem.num2} = ?
            </Typography>
            <Grid container spacing={1} justifyContent="center">
                {options.map((option, index) => (
                    <Grid item xs={6} key={index}>
                        <StyledCard onClick={() => handleOptionClick(option)}>
                            {option}
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    return (
        <WrapperBox>
            <TestLayout title="Problem Test">
                {gameState === 'selection' ? renderTestSelection() : renderGame()}
                <Dialog open={showResults} onClose={() => {}} disableEscapeKeyDown>
                    <DialogTitle>Time's Up!</DialogTitle>
                    <DialogContent>
                        <Typography variant="h6" gutterBottom>
                            Final Score: {score}
                        </Typography>
                        <Typography variant="body1">
                            Would you like to submit your score or try another test?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setShowResults(false);
                                setGameState('selection');
                                setIsGameEnded(false);
                                setTimeLeft(30);
                            }}
                        >
                            Try Another Test
                        </Button>
                        <Button
                            onClick={handleTestComplete}
                            color="primary"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Submit Score'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </TestLayout>
        </WrapperBox>
    );
};

export default ProblemTest;