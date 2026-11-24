import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import 'maplibre-gl/dist/maplibre-gl.css';
import './styles.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#76a9b5' },
    secondary: { main: '#d4a94e' },
    background: { default: '#111a20', paper: '#1b2931' },
    text: { primary: '#edf2f3', secondary: '#aebdc2' },
    divider: '#35464e'
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 }
  },
  shape: { borderRadius: 5 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 4 } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
