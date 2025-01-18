import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const Timer = ({ duration, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onComplete]);

    return (
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <Typography variant="h6">
                Time: {timeLeft}s
            </Typography>
        </Box>
    );
};

export default Timer;