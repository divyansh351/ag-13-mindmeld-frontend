import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import { getSkills, updateSkills } from '../services/api';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await getSkills();
      setSkills(response.skillTree);
    };

    fetchSkills();
  }, []);

  const handleSkillUpdate = async (skillType, action) => {
    await updateSkills(skillType, action);
    // Re-fetch skills after update
    const response = await getSkills();
    setSkills(response.skillTree);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Skills
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(skills).map(([skillType, { unlocked, level }]) => (
          <Grid item xs={12} sm={6} md={4} key={skillType}>
            <Typography variant="h6">{skillType}</Typography>
            <Typography>Level: {level}</Typography>
            <Typography>Unlocked: {unlocked ? 'Yes' : 'No'}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSkillUpdate(skillType, 'levelUp')}
              disabled={!unlocked}
            >
              Level Up
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleSkillUpdate(skillType, 'unlock')}
              disabled={unlocked}
            >
              Unlock
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Skills;