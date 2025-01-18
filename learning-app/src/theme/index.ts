import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green color for primary actions
    },
    secondary: {
      main: '#FF9800', // Orange color for secondary actions
    },
    background: {
      default: '#F5F5F5', // Light grey background
      paper: '#FFFFFF', // White background for paper components
    },
    text: {
      primary: '#212121', // Dark text color
      secondary: '#757575', // Light text color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
  },
});

export default theme;