import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './pages/Home/App';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </React.StrictMode>
);


