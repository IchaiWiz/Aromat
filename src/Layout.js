import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AuthHeader from './Components/Header/AuthHeader';
import AuthFooter from './Components/Footer/AuthFooter';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      {isAuthPage ? <AuthHeader /> : <Header />}
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isAuthPage ? 'center' : 'flex-start',
      }}>
        {children}
      </Box>
      {isAuthPage ? <AuthFooter /> : <Footer />}
    </Box>
  );
};

export default Layout;