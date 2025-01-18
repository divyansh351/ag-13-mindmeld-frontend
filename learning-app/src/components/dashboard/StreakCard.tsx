import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface StreakCardProps {
  streak: number;
}

const StreakCard: React.FC<StreakCardProps> = ({ streak }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Your Streak
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {streak} days
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StreakCard;