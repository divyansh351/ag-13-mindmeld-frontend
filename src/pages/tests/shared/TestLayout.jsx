import { Container, Paper, Box, Typography } from '@mui/material';

const TestLayout = ({ title, description, children }) => {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>{title}</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    {description}
                </Typography>
                <Box sx={{ mt: 4 }}>{children}</Box>
            </Paper>
        </Container>
    );
};

export default TestLayout;