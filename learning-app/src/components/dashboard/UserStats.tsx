import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UserStats: React.FC = () => {
    // Sample user statistics data
    const userStats = {
        xp: 1200,
        level: 5,
        coins: 150,
        streak: 7,
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    User Statistics
                </Typography>
                <Typography color="text.secondary">
                    XP: {userStats.xp}
                </Typography>
                <Typography color="text.secondary">
                    Level: {userStats.level}
                </Typography>
                <Typography color="text.secondary">
                    Coins: {userStats.coins}
                </Typography>
                <Typography color="text.secondary">
                    Streak: {userStats.streak} days
                </Typography>
            </CardContent>
        </Card>
    );
};

export default UserStats;