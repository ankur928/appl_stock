// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import App from './App';
import { theme } from './theme';

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: theme.colors.primary,
    },
    secondary: {
      main: theme.colors.secondary,
    },
    text: {
      primary: theme.colors.text,
    },
  },
  typography: {
    fontFamily: theme.fonts.primary,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={muiTheme}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
