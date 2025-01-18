import React from 'react';
import { Card, CardContent, Typography, LinearProgress } from '@mui/material';

interface ProgressCardProps {
  progress: number; // Progress percentage (0-100)
}

const ProgressCard: React.FC<ProgressCardProps> = ({ progress }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Your Progress
        </Typography>
        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="body2" color="text.secondary">
          {progress}% completed
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;