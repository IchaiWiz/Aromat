// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F4C430', // Safran
    },
    secondary: {
      main: '#FF5733', // Paprika
    },
    button: {
      main: '#f5f5dc', // Poivre Noir
    },
    error: {
      main: '#D2691E', // Cannelle
    },
    warning: {
      main: '#C5E384', // Cardamome
    },
    info: {
      main: '#343837', // Poivre Noir
    },
    background: {
      default: '#fffaf0', // un blanc cassé pour le fond
    },
  },
    typography: {
        fontFamily: '"Playfair Display", serif', // Police primaire pour les titres et les en-têtes
        body1: {
          fontFamily: '"Lato", sans-serif', // Police secondaire pour le corps du texte
        },
  },
  // Ajoutez d'autres personnalisations ici
});

export default theme;
