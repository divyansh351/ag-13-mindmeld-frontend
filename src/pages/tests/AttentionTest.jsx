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
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    minHeight: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.02)',
    },
}));

const TestButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    minWidth: '150px',
}));

const WrapperBox = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
}));

const AttentionTest = () => {
    const navigate = useNavigate();
    const [testType, setTestType] = useState('');
    const [gameState, setGameState] = useState('selection');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [items, setItems] = useState([]);
    const [targetItem, setTargetItem] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isGameEnded, setIsGameEnded] = useState(false);

    const testConfigs = {
        oddOneOut: {
            generateItems: () => {
                const baseColor = getRandomColor();
                const oddColor = getRandomColor();
                const newItems = Array(9).fill(baseColor);
                const oddPosition = Math.floor(Math.random() * 9);
                newItems[oddPosition] = oddColor;
                return { items: newItems, target: oddPosition };
            },
        },
       visualSearch: {
    generateItems: () => {
        const shapes = ['●', '■', '▲'];
        const colors = {
            Red: '#FF0000',
            Blue: '#0000FF',
            Green: '#00FF00'
        };
        const colorNames = Object.keys(colors);
        // Ensure we have exactly 9 cards
        const items = Array(8).fill(null).map(() => ({
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            colorName: colorNames[Math.floor(Math.random() * colorNames.length)]
        }));
        // Add a target item
        const target = {
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            colorName: colorNames[Math.floor(Math.random() * colorNames.length)]
        };
        items.push(target); // Add target item
        return { items: shuffle(items), target }; // Shuffle for randomness
    },
},

        numberMatching: {
            generateItems: () => {
                const target = Math.floor(Math.random() * 9) + 1;
                const items = Array(9).fill(null).map(() => Math.floor(Math.random() * 9) + 1);
                const targetCount = 3;
                for (let i = 0; i < targetCount; i++) {
                    items[i] = target;
                }
                return { items: shuffle(items), target };
            },
        },
        letterCancellation: {
            generateItems: () => {
                const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const target = letters[Math.floor(Math.random() * letters.length)];
                const items = Array(9).fill(null).map(() => 
                    letters[Math.floor(Math.random() * letters.length)]
                );
                const targetCount = 3;
                for (let i = 0; i < targetCount; i++) {
                    items[i] = target;
                }
                return { items: shuffle(items), target };
            },
        },
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

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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

    const startTest = (type) => {
        setTestType(type);
        setGameState('playing');
        setScore(0);
        setTimeLeft(30);
        setIsGameEnded(false);
        const { items, target } = testConfigs[type].generateItems();
        setItems(items);
        setTargetItem(target);
    };

    const handleItemClick = (index) => {
        if (isGameEnded) return;

        switch (testType) {
            case 'oddOneOut':
                if (index === targetItem) setScore((prev) => prev + 1);
                break;
            case 'visualSearch':
                const clickedItem = items[index];
                if (clickedItem.shape === targetItem.shape && 
                    clickedItem.colorName === targetItem.colorName) {
                    setScore((prev) => prev + 1);
                }
                break;
            case 'numberMatching':
            case 'letterCancellation':
                if (items[index] === targetItem) setScore((prev) => prev + 1);
                break;
        }
        generateNewRound();
    };

    const generateNewRound = () => {
        const { items, target } = testConfigs[testType].generateItems();
        setItems(items);
        setTargetItem(target);
    };

    const handleTestComplete = async () => {
        setLoading(true);
        try {
            await testService.submitAttentionTest('attention-test', {
                testType,
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
    <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom align="center">
                Select Attention Test Type
            </Typography>
        </Grid>
        {Object.keys(testConfigs).map((type) => (
            <Grid item xs={12} sm={6} md={4} key={type} display="flex" justifyContent="center">
                <TestButton
                    variant="contained"
                    color="primary"
                    onClick={() => startTest(type)}
                    fullWidth
                >
                    {type.split(/(?=[A-Z])/).join(' ')}
                </TestButton>
            </Grid>
        ))}
    </Grid>
);


    const renderGame = () => (
        <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
                Score: {score} | Time: {timeLeft}s
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {getTestInstructions()}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {items.map((item, index) => (
                    <Grid item xs={4} key={index}>
                        <StyledCard
                            onClick={() => handleItemClick(index)}
                            style={getItemStyle(item)}
                        >
                            {renderItem(item)}
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    const getTestInstructions = () => {
        switch (testType) {
            case 'oddOneOut':
                return 'Find the item with a different color';
            case 'visualSearch':
                const colors = {
                    Red: '#FF0000',
                    Blue: '#0000FF',
                    Green: '#00FF00'
                };
                return (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Typography>Find this shape: </Typography>
                        <Typography 
                            style={{ 
                                color: colors[targetItem?.colorName],
                                marginLeft: '8px',
                                fontSize: '2rem'
                            }}
                        >
                            {targetItem?.shape}
                        </Typography>
                    </Box>
                );
            case 'numberMatching':
                return `Find all numbers matching ${targetItem}`;
            case 'letterCancellation':
                return `Find all instances of the letter "${targetItem}"`;
            default:
                return '';
        }
    };

    const getItemStyle = (item) => {
        switch (testType) {
            case 'oddOneOut':
                return { backgroundColor: item };
            case 'visualSearch':
                const colors = {
                    Red: '#FF0000',
                    Blue: '#0000FF',
                    Green: '#00FF00'
                };
                return { 
                    color: colors[item.colorName],
                    fontSize: '2rem'
                };
            case 'numberMatching':
            case 'letterCancellation':
                return { fontSize: '2rem' };
            default:
                return {};
        }
    };

    const renderItem = (item) => {
        switch (testType) {
            case 'oddOneOut':
                return '';
            case 'visualSearch':
                return item.shape;
            case 'numberMatching':
            case 'letterCancellation':
                return item;
            default:
                return '';
        }
    };

    return (
        <WrapperBox>
            <TestLayout title="Attention Tests">
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

export default AttentionTest;