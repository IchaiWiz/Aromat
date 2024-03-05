import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
  import Button from '@mui/material/Button';
const Test = () => {
  const theme = useTheme(); // Utilisez useTheme pour accéder au thème actuel



const TestButton = () => (
  <Button color="primary">Test Button</Button>
);


  return (
<Box
  style={{ backgroundColor: theme.palette.background.main }}
  sx={{
    height: "100vh",
    width: "100vw",
  }}
>
  Ceci est un test de la couleur de fond.
  <TestButton />
</Box>

  );
};

export default Test;
