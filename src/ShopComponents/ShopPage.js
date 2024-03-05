// ShopPage.js
import React, { useState } from 'react';
import { Box } from '@mui/material';
import ShopBanner from './ShopBanner/ShopBanner';
import ShopSearch from './ShopSearch/ShopSearch';
import ShopProduct from './ShopProducts/ShopProduct';

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const [filters, setFilters] = useState({
    category: '',
    sort: ''
  });
  
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };
  

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5dc',
      p: 4
    }}>
      <ShopBanner />
      <ShopSearch onSearch={handleSearch} onFiltersChange={handleFiltersChange} />
      <Box sx={{ display: 'flex', justifyContent: 'center', maxWidth: 'lg', mx: 'auto' }}>
      <ShopProduct searchTerm={searchTerm} filters={filters} />
      </Box>
    </Box>
  );
};

export default ShopPage;
