import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  List,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddToCartDrawer = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isOpen) {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      fetch(`http://localhost:5000/api/cart-details/${userId}`)
        .then((res) => res.json())
        .then(setItems)
        .catch(console.error);
    }
  }, [isOpen]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleQuantityChange = (product, newQuantity) => {
    setCurrentProduct(product);
    if (newQuantity <= 0) {
      setOpenDialog(true);
    } else {
      updateQuantity(product.product_id, newQuantity);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      fetch("http://localhost:5000/api/update-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity: newQuantity }),
      })
        .then(() => {
          if (isOpen && userId) {
            fetch(`http://localhost:5000/api/cart-details/${userId}`)
              .then((res) => res.json())
              .then(setItems)
              .catch(console.error);
          }
        })
        .catch(console.error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRemoveItem = () => {
    if (currentProduct) {
      updateQuantity(currentProduct.product_id, 0);
      setOpenDialog(false);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/CheckoutShipping"); // Utilisez le chemin correct vers votre page de checkout
  };
  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={onClose} sx={{ '& .MuiDrawer-paper': { width: isMobile ? '100%' : 480, overflow: 'hidden' } }}>
  <Box sx={{ width: isMobile ? 'auto' : 480, p: 2, paddingRight: isMobile ? 2 : 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
              <Typography variant="h6" component="div" gutterBottom>
                Your Cart
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ marginRight: '22px' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <List>
            {items.map((item, index) => (
              <Card key={index} sx={{ display: "flex", mb: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151, height: 151 }}
                  image={item.image}
                  alt={item.name}
                />
                <Box
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  <CardContent
                    sx={{
                      flex: "1 0 auto",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography component="div" variant="h6">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        ${item.price}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </List>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${totalPrice}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1, color: "text.primary" }}
            onClick={onClose}
          >
            Continue Shopping
          </Button>
        </Box>
      </Drawer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Remove Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {currentProduct?.name} from your
            cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleRemoveItem} autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddToCartDrawer;
