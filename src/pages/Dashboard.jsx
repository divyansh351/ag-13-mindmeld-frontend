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
    LinearProgress,
} from '@mui/material';
import { userService } from '../services/api';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SpeedIcon from '@mui/icons-material/Speed';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[8],
    },
}));

const getBadgeInfo = (score) => {
    if (score > 20) return { color: '#FFD700', label: 'Gold', next: null };
    if (score > 10) return { color: '#C0C0C0', label: 'Silver', next: 20 };
    return { color: '#CD7F32', label: 'Bronze', next: 10 };
};

const ScoreCard = ({ icon, score, title }) => {
    const badgeInfo = getBadgeInfo(score);
    const progress = badgeInfo.next ? (score / badgeInfo.next) * 100 : 100;

    return (
        <StyledCard>
            <CardContent sx={{ textAlign: 'center', position: 'relative', pb: 1 }}>
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <Box
                        sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: badgeInfo.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <EmojiEventsIcon sx={{ fontSize: 16, color: 'white' }} />
                    </Box>
                </Box>
                {icon}
                <Typography variant="h5" sx={{ my: 1 }}>{score}</Typography>
                <Typography color="text.secondary" gutterBottom>{title}</Typography>
                <Typography variant="caption" color="text.secondary">
                    {badgeInfo.label} {badgeInfo.next ? `(Next: ${badgeInfo.next})` : '(Max)'}
                </Typography>
                <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{ 
                        mt: 1,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: badgeInfo.color,
                        }
                    }} 
                />
            </CardContent>
        </StyledCard>
    );
};

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

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
        </Box>
    );

    const lowestScore = Math.min(
        profile?.memoryscore,
        profile?.problemscore,
        profile?.focusscore,
        profile?.attentionscore,
        profile?.reactionscore
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Header */}
                <Grid item xs={12}>
                    <Paper 
                        elevation={3}
                        sx={{ 
                            p: 4, 
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            color: 'white'
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="h4" sx={{ mb: 1 }}>Welcome, {profile?.username}!</Typography>
                                <Typography variant="h6">
                                    Experience: {profile?.exp} • Streak: {profile?.streak} days
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                                <LocalFireDepartmentIcon sx={{ fontSize: 40, color: '#FFD700' }} />
                                <Typography variant="h6">Daily Streak</Typography>
                                <Typography variant="h4">{profile?.streak}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Score Cards */}
                <Grid item xs={12} sm={6} md={4}>
                    <ScoreCard
                        icon={<PsychologyIcon sx={{ fontSize: 40, color: '#2196F3' }} />}
                        score={profile?.memoryscore}
                        title="Memory Score"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <ScoreCard
                        icon={<WorkHistoryIcon sx={{ fontSize: 40, color: '#4CAF50' }} />}
                        score={profile?.problemscore}
                        title="Problem Score"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <ScoreCard
                        icon={<VisibilityIcon sx={{ fontSize: 40, color: '#9C27B0' }} />}
                        score={profile?.focusscore}
                        title="Focus Score"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <ScoreCard
                        icon={<SpeedIcon sx={{ fontSize: 40, color: '#FF9800' }} />}
                        score={profile?.reactionscore}
                        title="Reaction Score"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <ScoreCard
                        icon={<VisibilityIcon sx={{ fontSize: 40, color: '#F44336' }} />}
                        score={profile?.attentionscore}
                        title="Attention Score"
                    />
                </Grid>

                {/* Recommendation Card */}
                <Grid item xs={12}>
                    <Paper 
                        elevation={3}
                        sx={{ 
                            p: 3, 
                            bgcolor: 'warning.light',
                            color: 'warning.contrastText'
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Improvement Recommendation
                        </Typography>
                        <Typography>
                            Your lowest score is {lowestScore}. Focus on improving this area to achieve a better overall performance.
                            Take more tests to reach the next badge level!
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;