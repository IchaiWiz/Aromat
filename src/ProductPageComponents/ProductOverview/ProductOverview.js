import React, { useState, useEffect } from "react";
import {
  Grid, Typography, Button, Rating, Box, Card, CardMedia, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SpaIcon from '@mui/icons-material/Spa';
import VerifiedIcon from '@mui/icons-material/Verified';
import NatureIcon from '@mui/icons-material/Nature';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HealingIcon from '@mui/icons-material/Healing';
import theme from "../../theme";
import "./ProductOverview.style.css"; 
import AddToCartDrawer from "../AddToCart/AddToCartDrawer";
import { jwtDecode } from 'jwt-decode';

const iconsMap = {
  spa: <SpaIcon />,
  quality: <VerifiedIcon />,
  eco: <NatureIcon />,
  dining: <LocalDiningIcon />,
  health: <HealingIcon />,
};

const ProductOverview = ({ productId }) => {
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/product-details/${productId}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setSelectedImage(data.images[0]);
      })
      .catch(error => console.error('There was an error!', error));
  }, [productId]);

  const handleAddToCartClick = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
  
    if (userId && product) {
      fetch('http://localhost:5000/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: product.product_id,
          quantity: 1, 
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.alreadyInCart) {
          console.log('Produit déjà dans le panier.');
        } else {
          console.log(data.message);
        }
        setDrawerOpen(true); // Ouvre le drawer du panier que le produit soit ajouté ou déjà présent
      })
      .catch(error => {
        console.error('There was an error:', error);
      });
    } else {
      console.log('User ID or product information is missing');
    }
  } catch (error) {
    console.error('Invalid token:', error);
  }
} else {
  setErrorDialogOpen(true);
  console.log('User is not logged in');
}
};
  
  
  

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  if (!product) {
    return <Typography>Product not found!</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={2} sm={2} md={2} lg={1} xl={1}
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          {product.images.map((img, index) => (
            <Box key={index} sx={{ width: "100%", mb: 2, cursor: "pointer" }}>
              <Card 
                sx={{ 
                  border: selectedImage === img ? `2px solid ${theme.palette.primary.main}` : "none",
                  boxShadow: selectedImage === img ? 3 : 1,
                }}
              >
                <CardMedia
                  component="img"
                  className={`product-image-thumbnail ${selectedImage === img ? "selected" : ""}`}
                  image={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(img)}
                />
              </Card>
            </Box>
          ))}
        </Grid>
        
        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}
          container
          justifyContent="center"
          alignItems="flex-start"
        >
          <Card sx={{ maxWidth: "100%", maxHeight: 558 }}>
            <CardMedia
              component="img"
              className="product-image-main"
              image={selectedImage}
              alt={`${product.name} image`}
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
            <Rating
              name="read-only"
              value={product.rating}
              precision={0.5}
              readOnly
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              icon={<StarIcon fontSize="inherit" />}
              halfIcon={<StarHalfIcon fontSize="inherit" />}
            />
            <Typography sx={{ ml: 1 }}>({product.reviews} Reviews)</Typography>
          </Box>

          {Object.entries(product.details).map(([key, value], index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", my: 6 }}>
              <ListItemIcon>{iconsMap[key]}</ListItemIcon>
              <Typography variant="body2">{value}</Typography>
            </Box>
          ))}

          <Box sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: 'center',
            mt: 2,
            px: 2,
          }}>
            <Typography variant="h6" component="p">
              {product.price}
            </Typography>
            <Button
              variant="contained"
              className="add-to-cart-button"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCartClick}
              sx={{
                ml: { xs: 1, sm: 2 },
                backgroundColor: theme.palette.button.main,
                "&:hover": {
                  backgroundColor: theme.palette.button.dark,
                },
              }}
            >
              ADD TO CART
            </Button>
            <AddToCartDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} product={product} />
          </Box>
        </Grid>
      </Grid>
      <Dialog
    open={isErrorDialogOpen}
    onClose={() => setErrorDialogOpen(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>
    <DialogTitle id="alert-dialog-title">{"Erreur"}</DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Vous devez être connecté pour ajouter des articles au panier.
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setErrorDialogOpen(false)} color="primary">
            Fermer
        </Button>
    </DialogActions>
</Dialog>
    </Box>
  );
};

export default ProductOverview;
