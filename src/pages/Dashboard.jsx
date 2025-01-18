import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    CircularProgress,
    Card,
    CardContent,
} from '@mui/material';
import { userService } from '../services/api';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userService.getProfile();
                setProfile(data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box>
                            <Typography variant="h4">Welcome, {profile?.username}!</Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Level {profile?.level} • {profile?.xp} XP
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Stats Cards */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <LocalFireDepartmentIcon color="error" sx={{ fontSize: 40 }} />
                            <Typography variant="h5">{profile?.streak} Days</Typography>
                            <Typography color="text.secondary">Current Streak</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <WorkspacePremiumIcon color="primary" sx={{ fontSize: 40 }} />
                            <Typography variant="h5">{profile?.coins}</Typography>
                            <Typography color="text.secondary">Coins</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <EmojiEventsIcon color="secondary" sx={{ fontSize: 40 }} />
                            <Typography variant="h5">{profile?.achievements?.length || 0}</Typography>
                            <Typography color="text.secondary">Achievements</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Performance */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Performance
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {profile?.recentPerformance?.map((perf, index) => (
                                <Paper
                                    key={index}
                                    sx={{
                                        p: 1,
                                        bgcolor: perf.score > 80 ? '#58cc02' : '#ff4b4b',
                                        color: 'white',
                                    }}
                                >
                                    <Typography variant="body2">
                                        {perf.score}% • {perf.testType}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;