import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { getProfile } from '../services/api';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box padding={2}>
      <Typography variant="h4">Profile</Typography>
      {profileData ? (
        <Box>
          <Typography variant="h6">Username: {profileData.username}</Typography>
          <Typography variant="h6">Email: {profileData.email}</Typography>
          <Typography variant="h6">Age: {profileData.age}</Typography>
          <Typography variant="h6">Occupation: {profileData.occupation}</Typography>
          <Typography variant="h6">Goals: {profileData.goals.join(', ')}</Typography>
        </Box>
      ) : (
        <Typography variant="body1">No profile data available.</Typography>
      )}
    </Box>
  );
};

export default Profile;