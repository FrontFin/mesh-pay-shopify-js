// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B3A67', // A modern shade of blue
    },
    secondary: {
      main: '#FFC107', // A vibrant shade of yellow
    },
    background: {
      default: '#F4F4F4', // Light grey for background
      paper: '#FFFFFF', // White background for paper/card elements
    },
    text: {
      primary: '#333333', // Dark grey for primary text
      secondary: '#555555', // Lighter grey for secondary text
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2B3A67',
          color: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFC107',
          color: 'white',
          '&:hover': {
            backgroundColor: '#FFCA28',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          padding: '15px',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e0e0e0', // Added border style
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#2B3A67',
          color: '#FFFFFF',
        },
      },
    },
    // Add more component styles as needed
  },
  // You can also add custom properties if needed
});

export default theme;
