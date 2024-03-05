import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#FAD02E', // Safran clair
      main: '#F4C430', // Safran
      dark: '#CDAF2C', // Safran foncé
      contrastText: '#000', // Texte sur Safran
    },
    secondary: {
      light: '#FF8B66', // Paprika clair
      main: '#FF5733', // Paprika
      dark: '#C74424', // Paprika foncé
      contrastText: '#fff', // Texte sur Paprika
    },
    button: {
      main: '#f5f5dc', // Beige Poivre Noir
      dark: '#f5f5dc', // Beige Poivre Noir
    },
    error: {
      light: '#E57C50', // Cannelle claire
      main: '#D2691E', // Cannelle
      dark: '#A0522D', // Cannelle foncée
      contrastText: '#fff', // Texte sur Cannelle
    },
    warning: {
      light: '#E0F8B7', // Cardamome claire
      main: '#C5E384', // Cardamome
      dark: '#9CBF58', // Cardamome foncée
      contrastText: '#000', // Texte sur Cardamome
    },
    info: {
      light: '#9AA0A8', // Gris Poivre Noir clair
      main: '#343837', // Poivre Noir
      dark: '#1B1C1D', // Gris Poivre Noir foncé
      contrastText: '#fff', // Texte sur Poivre Noir
    },
    success: {
      light: '#98FB98', // Menthe claire
      main: '#00FF7F', // Menthe
      dark: '#3CB371', // Menthe foncée
      contrastText: '#000', // Texte sur Menthe
    },
    background: {
      default: '#fffaf0', // Blanc cassé pour le fond général
      paper: '#f5f5dc', // Beige clair pour le fond du menu
      info: '#fdf5e6', // Beige encore plus clair pour contraste doux
      spice1: '#8B4513', // Chocolat (évoque le cacao)
      spice2: '#A0522D', // Sienna (rappelle la terre)
      spice3: '#6E2C00', // Cannelle foncée
      spice4: '#8B0000', // Rouge foncé (piment)
      spice5: '#654321', // Noix de muscade
      spice6: '#3C2F2F', // Café
      spice7: '#D2C29D', // Curry en poudre, une nuance douce de jaune-vert
      spice8: '#F9E79F', // Curcuma, une nuance dorée vibrante
    },
    text: {
      primary: '#343837', // Poivre Noir
      secondary: '#6E6E6E', // Gris moyen
      dark: '#1B1C1D', // Gris foncé
    },
  },
  typography: {
    fontFamily: '"Playfair Display", serif',
    body1: {
      fontFamily: '"Lato", sans-serif',
    },
  },
  // Autres personnalisations...
});

export default theme;