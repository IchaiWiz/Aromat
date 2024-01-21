// ShopPage.js
import React from 'react';
import { Box } from '@mui/material';
import ShopBanner from './ShopBanner/ShopBanner';
import ShopSearch from './ShopSearch/ShopSearch';
import ShopProduct from './ShopProducts/ShopProduct';
import ShopFilter from './ShopFilter/ShopFilter';

const ShopPage = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5dc', // Exemple d'une couleur épice (beige clair)
      p: 4
    }}>
      <ShopBanner />
      <ShopSearch />
      <Box sx={{ display: 'flex', justifyContent: 'center', maxWidth: 'lg', mx: 'auto' }}>
        <ShopProduct />
      </Box>
    </Box>
  );
};

export default ShopPage;
