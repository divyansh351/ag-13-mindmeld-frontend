import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Grid } from '@mui/material';

const testTypes = {
    CONTINUOUS: 'continuous',
    STROOP: 'stroop',
    DISTRACTION: 'distraction',
    SWITCHING: 'switching',
    DIFFERENCE: 'difference',
    SEQUENCE: 'sequence',
    REACTION: 'reaction',
    MAZE: 'maze'
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

const FocusTest = () => {
    const [currentTest, setCurrentTest] = useState(null);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('menu');

    const commonStyles = {
        testContainer: {
            width: '100%',
            minHeight: '400px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px 0'
        },
        button: {
            margin: '10px',
            padding: '15px 30px',
            fontSize: '16px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#1976d2',
                transform: 'scale(1.05)'
            }
        },
        gameArea: {
            width: '100%',
            height: '400px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            position: 'relative',
            overflow: 'hidden'
        }
    };

    const ContinuousAttentionTask = () => {
        const [target] = useState(7);
        const [currentNumber, setCurrentNumber] = useState(null);
        const [responses, setResponses] = useState([]);

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentNumber(Math.floor(Math.random() * 9) + 1);
            }, 2000);
            return () => clearInterval(interval);
        }, []);

        return (
            <Box sx={commonStyles.testContainer}>
                <Typography variant="h2">{currentNumber}</Typography>
                <Button 
                    variant="contained"
                    onClick={() => {
                        setResponses([...responses, {
                            number: currentNumber,
                            correct: currentNumber === target
                        }]);
                    }}
                >
                    Click when you see {target}
                </Button>
            </Box>
        );
    };

    const StroopTest = () => {
        const colors = ['red', 'blue', 'green', 'yellow'];
        const [currentWord, setCurrentWord] = useState({ text: '', color: '' });

        useEffect(() => {
            const interval = setInterval(() => {
                const text = colors[Math.floor(Math.random() * colors.length)];
                let color;
                do {
                    color = colors[Math.floor(Math.random() * colors.length)];
                } while (color === text);
                setCurrentWord({ text, color });
            }, 2000);
            return () => clearInterval(interval);
        }, []);

        return (
            <Box sx={commonStyles.testContainer}>
                <Typography 
                    variant="h2" 
                    style={{ color: currentWord.color }}
                >
                    {currentWord.text.toUpperCase()}
                </Typography>
                <Box>
                    {colors.map(color => (
                        <Button
                            key={color}
                            variant="contained"
                            style={{ backgroundColor: color }}
                            onClick={() => {
                                const correct = color === currentWord.color;
                                setScore(prev => prev + (correct ? 1 : 0));
                            }}
                        >
                            {color}
                        </Button>
                    ))}
                </Box>
            </Box>
        );
    };

    const DistractionFilterTest = () => {
        const [targets, setTargets] = useState([]);
        const [distractors, setDistractors] = useState([]);
        const [level, setLevel] = useState(1);
        useEffect(() => {
            generateLevel(level);
        }, [level]);
    
        const generateLevel = (lvl) => {
            const targetCount = 3;
            const distractorCount = lvl * 5;
            setTargets(Array(targetCount).fill('●'));
            setDistractors(Array(distractorCount).fill('○'));
        };
    
        return (
            <Box sx={commonStyles.testContainer}>
                <Typography>Find all ● symbols</Typography>
                <Grid container spacing={2}>
                    {shuffle([...targets, ...distractors]).map((item, idx) => (
                        <Grid item key={idx}>
                            <Button onClick={() => {
                                if(item === '●') setScore(s => s + 1);
                            }}>
                                {item}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    };


    const TaskSwitchingTest = () => {
        const [currentTask, setCurrentTask] = useState('math');
        const [problem, setProblem] = useState(null);
        const [answer, setAnswer] = useState('');

        useEffect(() => {
            generateProblem();
        }, [currentTask]);

        const generateProblem = () => {
            if(currentTask === 'math') {
                const a = Math.floor(Math.random() * 10);
                const b = Math.floor(Math.random() * 10);
                setProblem({ question: `${a} + ${b}`, answer: a + b });
            } else {
                const words = ['CAT', 'DOG', 'BIRD'];
                setProblem({ question: words[Math.floor(Math.random() * words.length)], answer: 'animal' });
            }
        };

        return (
            <Box sx={commonStyles.testContainer}>
                <Typography>{problem?.question}</Typography>
                <Button onClick={() => setCurrentTask(t => t === 'math' ? 'category' : 'math')}>
                    Switch Task
                </Button>
            </Box>
        );
    };


    const FlashingSequenceTest = () => {
        const [sequence, setSequence] = useState([]);
        const [userSequence, setUserSequence] = useState([]);
        const [isPlaying, setIsPlaying] = useState(false);
    
        const generateSequence = () => {
            const newSequence = Array(4).fill(0).map(() => Math.floor(Math.random() * 4));
            setSequence(newSequence);
            playSequence(newSequence);
        };
    
        const playSequence = async (seq) => {
            setIsPlaying(true);
            for(let i = 0; i < seq.length; i++) {
                await new Promise(r => setTimeout(r, 1000));
                // Flash tile logic
            }
            setIsPlaying(false);
        };
        return (
            <Box sx={commonStyles.testContainer}>
                <Grid container spacing={2}>
                    {[0,1,2,3].map(num => (
                        <Grid item key={num}>
                            <Button 
                                disabled={isPlaying}
                                onClick={() => {
                                    setUserSequence([...userSequence, num]);
                                }}
                            >
                                {num}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    };
    

    const ReactionTest = () => {
        const [waiting, setWaiting] = useState(false);
        const [startTime, setStartTime] = useState(null);
        const [reactionTime, setReactionTime] = useState(null);
    
        const startTest = () => {
            setWaiting(true);
            const delay = 1000 + Math.random() * 4000;
            setTimeout(() => {
                setStartTime(Date.now());
            }, delay);
        };
    
        const handleClick = () => {
            if(!startTime) return;
            const time = Date.now() - startTime;
            setReactionTime(time);
            setScore(s => s + Math.max(0, 1000 - time));
        };
        return (
            <Box sx={commonStyles.testContainer}>
                <Button 
                    onClick={waiting ? handleClick : startTest}
                    sx={{
                        backgroundColor: startTime ? 'green' : 'red',
                        height: 200,
                        width: 200
                    }}
                >
                    {waiting ? 'Wait...' : 'Start'}
                </Button>
                {reactionTime && <Typography>Reaction time: {reactionTime}ms</Typography>}
            </Box>
        );
    };
    
    

    const renderTest = () => {
        switch(currentTest) {
            case testTypes.CONTINUOUS:
                return <ContinuousAttentionTask />;
            case testTypes.STROOP:
                return <StroopTest />;
            case testTypes.DISTRACTION:
                return <DistractionFilterTest />;
            case testTypes.SWITCHING:
                return <TaskSwitchingTest />;
            case testTypes.SEQUENCE:
                return <FlashingSequenceTest />;
            case testTypes.REACTION:
                return <ReactionTest />;
            default:
                return (
                    <Box sx={commonStyles.testContainer}>
                        <Typography variant="h4">Select a Test</Typography>
                        {Object.values(testTypes).map(test => (
                            <Button
                                key={test}
                                variant="contained"
                                onClick={() => setCurrentTest(test)}
                                sx={commonStyles.button}
                            >
                                {test.charAt(0).toUpperCase() + test.slice(1)} Test
                            </Button>
                        ))}
                    </Box>
                );
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ padding: '20px' }}>
                <Typography variant="h3" gutterBottom>
                    Focus Test Suite
                </Typography>
                <Typography variant="h6">
                    Score: {score}
                </Typography>
                {renderTest()}
                {currentTest && (
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setCurrentTest(null);
                            setScore(0);
                        }}
                        sx={commonStyles.button}
                    >
                        Back to Menu
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default FocusTest;