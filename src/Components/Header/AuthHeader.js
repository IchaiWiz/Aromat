// AuthHeader.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import SpiceIcon from '@mui/icons-material/RestaurantMenu'; // Un exemple d'icône, choisissez celle qui convient

function AuthHeader() {
  return (
    <Box sx={{ padding: 3, backgroundColor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SpiceIcon sx={{ marginRight: 1, color: 'white' }} />
      <Typography variant="h5" color="white">
        Aromat - Les saveurs authentiques
      </Typography>
    </Box>
  );
}

export default AuthHeader;
