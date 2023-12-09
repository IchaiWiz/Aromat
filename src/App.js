
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; 
import Header from './Components/Header/Header'; 
import HomePage from './HomeComponents/HomePage'; 
import Footer from './Components/Footer/Footer';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <HomePage />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
