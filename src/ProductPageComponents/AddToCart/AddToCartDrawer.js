import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddToCartDrawer = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 'auto', maxWidth: 360, p: 2 }} role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" component="div">
            YOU HAVE {quantity} ITEM{quantity > 1 ? 'S' : ''} IN YOUR CART
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 2,
          }}
        >
          <img
            src={product.image1}
            alt={product.name}
            style={{ width: '80%', marginBottom: 2 }}
          />
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Box display="flex" alignItems="center">
            <Button onClick={handleDecrement}>-</Button>
            <Typography variant="body1" sx={{ margin: '0 10px' }}>
              {quantity}
            </Typography>
            <Button onClick={handleIncrement}>+</Button>
          </Box>
          <Button variant="outlined" sx={{ mt: 1, mb: 2 }}>
            Remove
          </Button>
          <Typography variant="body1" sx={{ alignSelf: 'flex-start' }}>
            Subtotal ({quantity} item{quantity > 1 ? 's' : ''}) {product.price * quantity}
          </Typography>
        </Box>
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          CHECKOUT
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            mb: 2,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            color: 'text.primary',
          }}
        >
          CONTINUE SHOPPING
        </Button>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ textAlign: 'left' }}></Box>
          <Button variant="contained">BUY NOW</Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AddToCartDrawer;