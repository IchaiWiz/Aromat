import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Rating,
  Box,
  Card,
  CardMedia,
  ListItemIcon,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SpaIcon from '@mui/icons-material/Spa'; // Représente des bienfaits sensoriels
import VerifiedIcon from '@mui/icons-material/Verified'; // Représente la qualité
import NatureIcon from '@mui/icons-material/Nature'; // Représente la durabilité
import LocalDiningIcon from '@mui/icons-material/LocalDining'; // Représente l'usage culinaire
import HealingIcon from '@mui/icons-material/Healing'; // Représente les bienfaits pour la santé
import theme from "../../theme";
import "./ProductOverview.style.css"; // Assurez-vous de créer ce fichier CSS

// Données statiques pour le produit exemple
const staticProducts = {
  1: {
    id: 1, // Ajoutez cet identifiant
    name: "Truffle Oil",
    image1: "../images/TruffeOil1.png",
    image2: "../images/TruffeOil2.png",
    image3: "../images/TruffeOil3.png",
    image4: "../images/TruffeOil4.png",
    rating: 5,
    reviews: 15,
    price: "$35",
  },
  2: {
    id: 2, // Ajoutez cet identifiant
    name: "Saffron",
    image1: "../images/Saffran1.png",
    image2: "../images/Saffran2.png",
    image3: "../images/Saffran3.png",
    image4: "../images/Saffran4.png",
    rating: 4.5,
    reviews: 27,
    price: "$55",
  },
  3: {
    id: 3, // Ajoutez cet identifiant
    name: "Vanilla",
    image1: "../images/Vanille1.png",
    image2: "../images/Vanille2.png",
    image3: "../images/Vanille3.png",
    image4: "../images/Vanille4.png",
    rating: 4.5,
    reviews: 30,
    price: "$50",
  },
};

const iconsMap = {
  heart: <FavoriteBorderIcon />,
  check: <CheckCircleIcon />,
  note: <EventNoteIcon />,
  spa: <SpaIcon />,
  quality: <VerifiedIcon />,
  eco: <NatureIcon />,
  dining: <LocalDiningIcon />,
  health: <HealingIcon />,
  // Ajoutez d'autres icônes ici selon vos besoins
};

const ProductOverview = ({ productId }) => {
  const product = staticProducts[productId];
  const [selectedImage, setSelectedImage] = useState(product.image1); // État pour l'image sélectionnée

  if (!product) {
    return <Typography>Product not found!</Typography>;
  }

  /*description des produits, à améliorer */

  const descriptions = [
    {
      icon: "spa",
      text: "Découvrez une ambiance enveloppante avec nos bougies parfumées, parfaites pour vos moments de détente.",
    },
    {
      icon: "quality",
      text: "Fabriqué avec les meilleurs ingrédients, notre huile de truffe apporte une touche de luxe à chaque plat.",
    },
    {
      icon: "eco",
      text: "Engagé envers la planète, notre safran est issu d'une agriculture durable respectueuse de l'environnement.",
    },
    {
      icon: "dining",
      text: "Polyvalent en cuisine, le safran rehausse vos plats de sa couleur dorée et de ses arômes délicats.",
    },
    {
      icon: "health",
      text: "Reconnu pour ses propriétés antioxydantes, le safran contribue au bien-être et à une alimentation équilibrée.",
    },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={4}>
        {/* Miniatures alignées à gauche */}
        <Grid item xs={2} sm={2} md={2} lg={1} xl={1}
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          {[product.image1, product.image2, product.image3, product.image4].map((img, index) => (
            <Box key={index} sx={{ width: "100%", mb: 2, cursor: "pointer" }}>
              <Card 
                sx={{ 
                  border: selectedImage === img ? `2px solid ${theme.palette.primary.main}` : "none",
                  boxShadow: selectedImage === img ? 3 : 1, // Augmenter l'ombre si sélectionnée
                }}
              >
                <CardMedia
                  component="img"
                  className={`product-image-thumbnail ${selectedImage === img ? "selected" : ""}`}
                  image={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  onClick={() => handleImageClick(img)}
                />
              </Card>
            </Box>
          ))}
        </Grid>
        
        {/* Image principale */}
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
          </Box >
          {descriptions.map((desc, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", my: 6 }}
            >
              <ListItemIcon>{iconsMap[desc.icon]}</ListItemIcon>
              <Typography variant="body3">{desc.text}</Typography>
            </Box>
          ))}
          {/* Prix et bouton */}
          <Box sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'space-between' }, // Centré sur xs, espacé sur sm et plus
            alignItems: 'center',
            mt: 2,
            px: 2, // Padding horizontal pour éviter que les éléments touchent les bords
          }}>
            <Typography variant="h6" component="p">
              {product.price}
            </Typography>
            <Button
              variant="contained"
              className="add-to-cart-button"
              startIcon={<ShoppingCartIcon />}
              sx={{
                ml: { xs: 1, sm: 2 }, // Marge à gauche, plus grande sur sm et plus
                backgroundColor: theme.palette.button.main,
                "&:hover": {
                  backgroundColor: theme.palette.button.dark,
                },
              }}
            >
              ADD TO CART
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductOverview;
