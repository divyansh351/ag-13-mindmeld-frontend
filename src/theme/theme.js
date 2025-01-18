import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#58cc02',
            dark: '#58a700',
            light: '#89e219'
        },
        secondary: {
            main: '#ce82ff',
            dark: '#9e5cb2',
            light: '#dca7ff'
        },
    },
    typography: {
        fontFamily: '"DIN Round Pro", "din-round", sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 700,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '12px 24px',
                    fontSize: '15px',
                    boxShadow: '0 4px 0 0 #58a700',
                    '&:hover': {
                        boxShadow: '0 4px 0 0 #58a700',
                    },
                },
            },
        },
    },
});