import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Nunito Sans", sans-serif',
  },
  palette: {
    mode: 'light', // Can be toggled to dark mode later
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default theme;