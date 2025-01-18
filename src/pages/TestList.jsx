import { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { testService } from '../services/testService';

const TestList = () => {
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const data = await testService.getAllTests();
                setTests(data);
            } catch (error) {
                console.error('Error fetching tests:', error);
            }
        };
        fetchTests();
    }, []);

    const testTypes = {
        memory: { color: '#FF6B6B', icon: '🧠' },
        attention: { color: '#4ECDC4', icon: '👀' },
        focus: { color: '#45B7D1', icon: '🎯' },
        reactionTime: { color: '#96CEB4', icon: '⚡' },
        problemSolving: { color: '#FFEEAD', icon: '💡' }
    };

    const handleTestClick = (testId, testType) => {
        navigate(`/test/${testType}/${testId}`);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Available Tests
            </Typography>
            <Grid container spacing={3}>
                {Object.keys(testTypes).map((type) => (
                    <Grid item xs={12} md={6} key={type}>
                        <Card
                            sx={{
                                bgcolor: testTypes[type].color,
                                color: 'white',
                                cursor: 'pointer',
                                '&:hover': { transform: 'scale(1.02)' },
                                transition: 'transform 0.2s'
                            }}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Typography variant="h1" component="span">
                                        {testTypes[type].icon}
                                    </Typography>
                                    <Box>
                                        <Typography variant="h5" gutterBottom>
                                            {type.replace(/([A-Z])/g, ' $1').trim()}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleTestClick(null, type)}
                                        >
                                            Start Test
                                        </Button>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TestList;