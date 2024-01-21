// ShopBanner/ShopBanner.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import theme from '../../theme';

const ShopBanner = () => {
  return (
    <Box className="shop-banner" sx={{ 
      backgroundColor: theme.palette.primary.main, // Utilisez une couleur de fond de votre thème
      color: theme.palette.primary.contrastText, // Assurez-vous que le texte est lisible
      p: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '20%', // Ajustez la hauteur selon vos besoins
      borderRadius: '4px', // Optionnel: pour adoucir les coins
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Optionnel: pour ajouter de la profondeur
    }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Découvrez les saveurs qui éveillent vos plats
      </Typography>
      <Typography variant="subtitle1">
        Explorez notre sélection d'épices et de bougies parfumées
      </Typography>
    </Box>
  );
};

export default ShopBanner;
