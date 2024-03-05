// AuthFooter.js
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

function AuthFooter() {
  return (
    <Box sx={{ padding: 2, backgroundColor: 'primary.main', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="white" gutterBottom>
        Suivez-nous sur les réseaux sociaux
      </Typography>
      <Box>
        <IconButton href="https://instagram.com" target="_blank" color="inherit"><InstagramIcon /></IconButton>
        <IconButton href="https://facebook.com" target="_blank" color="inherit"><FacebookIcon /></IconButton>
      </Box>
      <Typography variant="body2" color="white">
        © 2024 Aromat - Tous droits réservés.
      </Typography>
    </Box>
  );
}

export default AuthFooter;
