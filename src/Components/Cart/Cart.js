import React from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemText, IconButton, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'; // Icône pour retirer un article

const Cart = ({ isOpen, toggleCart }) => {
  // Supposons que cartItems soit un tableau d'objets avec { id, name, image, price, quantity }
const cartItems = [
    {
        id: 1,
        name: "Truffle Oil",
        image: "../images/TruffeOil1.png",
        price: "$35",
        quantity: 2
    },
    {
        id: 2,
        name: "Saffron",
        image: "../images/Saffran1.png",
        price: 15,
        quantity: 1
    },
    {
        id: 3,
        name: "Vanilla",
        image: "../images/Vanille1.png",
        price: 20,
        quantity: 3
    }
];

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => toggleCart(false)}>
      <Box sx={{ width: 360, p: 2 }} role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
          <Typography variant="h6">Votre panier</Typography>
          <IconButton onClick={() => toggleCart(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index}>
              <Box display="flex" alignItems="center" width="100%">
                <Box width="25%" p={1}>
                  <img src={item.image} alt={item.name} style={{ width: '100%' }} />
                </Box>
                <Box width="50%" p={1}>
                  <ListItemText primary={item.name} secondary={`Quantité: ${item.quantity}`} />
                  <Typography variant="body2">{`Prix: ${item.price} €`}</Typography>
                </Box>
                <Box width="25%" display="flex" justifyContent="flex-end">
                  <IconButton onClick={() => {/* fonction pour retirer l'article */}}>
                    <RemoveShoppingCartIcon />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
        <Box p={2}>
          <Typography variant="subtitle1" gutterBottom>Total: {getTotalPrice()} €</Typography>
          <Button variant="contained" fullWidth sx={{ mb: 1 }}>
            PASSER À LA CAISSE
          </Button>
          <Button variant="outlined" fullWidth>
            CONTINUER VOS ACHATS
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;
