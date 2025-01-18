import React from 'react';
import { Container, Grid } from '@mui/material';
import ProgressCard from '../components/dashboard/ProgressCard';
import SkillTree from '../components/dashboard/SkillTree';
import StreakCard from '../components/dashboard/StreakCard';
import UserStats from '../components/dashboard/UserStats';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ProgressCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <StreakCard />
        </Grid>
        <Grid item xs={12}>
          <SkillTree />
        </Grid>
        <Grid item xs={12}>
          <UserStats />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;