import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid, Card, Button, TextField, Select, MenuItem, Typography,
    Box, CircularProgress, Dialog, DialogTitle, DialogContent,
    DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';
import TestLayout from './shared/TestLayout';
import { testService } from '../../services/testService';
import { userService } from '../../services/api';

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(2, 0),
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '12px'
}));

const NumberDisplay = styled(Typography)(({ theme }) => ({
    fontSize: '2.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.5rem',
    textAlign: 'center',
    padding: theme.spacing(4)
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
    }
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

const MemoryTest = () => {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState('easy');
    const [numbers, setNumbers] = useState([]);
    const [showNumbers, setShowNumbers] = useState(false);
    const [userInputs, setUserInputs] = useState(['', '', '']);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [lastAttemptCorrect, setLastAttemptCorrect] = useState(false);

    const difficultySettings = {
        easy: { digits: 4, count: 3 },
        medium: { digits: 5, count: 3 },
        hard: { digits: 7, count: 3 }
    };

    useEffect(() => {
        let timer;
        if (showNumbers && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setShowNumbers(false);
        }
        return () => clearInterval(timer);
    }, [showNumbers, timeLeft]);

    const generateNumbers = () => {
        const { digits } = difficultySettings[difficulty];
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        const newNumbers = Array(3).fill(0).map(() => 
            Math.floor(Math.random() * (max - min + 1) + min)
        );
        setNumbers(newNumbers);
        setShowNumbers(true);
        setUserInputs(['', '', '']);
        setTimeLeft(10);
    };

    const handleInputChange = (index, value) => {
        const newInputs = [...userInputs];
        newInputs[index] = value;
        setUserInputs(newInputs);
    };

    const checkAnswers = () => {
        const allCorrect = numbers.every((num, index) => 
            num.toString() === userInputs[index]
        );
        if (allCorrect) {
            setScore(score + 1);
            setLastAttemptCorrect(true);
        } else {
            setLastAttemptCorrect(false);
        }
        setAttempts(attempts + 1);
        setOpenModal(true);
    };

    const handleSubmitTest = async () => {
        setIsSubmitting(true);
        try {
            console.log(score);
            await userService.updateStats({
                testType: 'memory',
                score: score,
                time: new Date().getTime()
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error submitting test:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const ResultModal = () => (
        <Dialog 
            open={openModal} 
            onClose={() => setOpenModal(false)}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                {lastAttemptCorrect ? "Correct! 🎉" : "Incorrect ❌"}
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    Current Score: {score}/{attempts}
                </Typography>
                <Box my={2}>
                    <Typography variant="subtitle1">Correct Numbers:</Typography>
                    <Typography variant="h5" color="primary">
                        {numbers.join(' - ')}
                    </Typography>
                </Box>
                <Box my={2}>
                    <Typography variant="subtitle1">Your Input:</Typography>
                    <Typography variant="h5" color={lastAttemptCorrect ? "success.main" : "error.main"}>
                        {userInputs.join(' - ')}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => {
                        setOpenModal(false);
                        generateNumbers();
                    }}
                    color="primary"
                    variant="contained"
                    disabled={attempts >= 10}
                >
                    Next Sequence
                </Button>
                <Button 
                    onClick={handleSubmitTest}
                    color="success"
                    variant="contained"
                    disabled={attempts === 0}
                >
                    Submit Test
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <WrapperBox>
            <TestLayout title="Memory Test">
                <StyledCard>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom color="primary">
                                Memory Challenge
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Select
                                fullWidth
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                disabled={showNumbers}
                            >
                                <MenuItem value="easy">Easy (4 digits)</MenuItem>
                                <MenuItem value="medium">Medium (5 digits)</MenuItem>
                                <MenuItem value="hard">Hard (7 digits)</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" color="primary">
                                    Score: {score}/10
                                </Typography>
                                <Typography variant="h6" color="secondary">
                                    Attempts: {attempts}/10
                                </Typography>
                                {showNumbers && (
                                    <Typography variant="h6" color="error">
                                        Time Remaining: {timeLeft}s
                                    </Typography>
                                )}
                            </Box>
                        </Grid>

                        {showNumbers ? (
                            <Grid item xs={12}>
                                <StyledCard>
                                    <NumberDisplay color="primary">
                                        {numbers.join(' - ')}
                                    </NumberDisplay>
                                </StyledCard>
                            </Grid>
                        ) : (
                            <Grid item xs={12} container spacing={2}>
                                {userInputs.map((input, index) => (
                                    <Grid item xs={12} md={4} key={index}>
                                        <TextField
                                            fullWidth
                                            label={`Number ${index + 1}`}
                                            variant="outlined"
                                            value={input}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            disabled={attempts >= 10}
                                            type="number"
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <ButtonGroup>
                                {!showNumbers && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={generateNumbers}
                                        disabled={attempts >= 10}
                                        startIcon={<RefreshIcon />}
                                        fullWidth
                                    >
                                        Generate New Sequence
                                    </Button>
                                )}
                                {!showNumbers && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={checkAnswers}
                                        disabled={attempts >= 10 || userInputs.some(input => !input)}
                                        startIcon={<CheckCircleIcon />}
                                        fullWidth
                                    >
                                        Check Answers
                                    </Button>
                                )}
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </StyledCard>
                <ResultModal />
            </TestLayout>
        </WrapperBox>
    );
};

export default MemoryTest;