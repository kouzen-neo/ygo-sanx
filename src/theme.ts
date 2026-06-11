import { createTheme } from '@mui/material';

export const inkAndSteelTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffea00' }, // Electric Yellow
    secondary: { main: '#ffffff' }, // Pure White
    background: { default: '#0a0a0a', paper: '#111111' },
    text: { primary: '#ffffff', secondary: '#a0a0a0' },
    divider: '#333333',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 900, letterSpacing: '-0.02em' },
    h6: { fontWeight: 700 },
  },
  shape: { borderRadius: 0 }, // Sharp corners
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: { variant?: string; color?: string } }) => ({
          borderRadius: 0,
          textTransform: 'none',
          fontWeight: 700,
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              color: '#000000',
            }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #333333',
          backgroundImage: 'none',
          backgroundColor: '#111111',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { border: '1px solid #333333', backgroundImage: 'none' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#0a0a0a', borderRight: '1px solid #333333' },
      },
    },
  },
});
