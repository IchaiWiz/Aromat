import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './theme'; 
import Header from './Components/Header/Header'; 
import HomePage from './HomeComponents/HomePage'; 
import Footer from './Components/Footer/Footer';
import ProductPage from '../src/ProductPageComponents/ProductPage'; // Supposons que vous ayez ce fichier
import ShopPage from '../src/ShopComponents/ShopPage'; // Supposons que vous ayez ce fichier

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/shop" element={<ShopPage/>} />

          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;