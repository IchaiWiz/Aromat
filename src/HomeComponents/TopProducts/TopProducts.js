import React from "react";
import { Grid, Typography, Button, Box, Rating } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate au lieu de useHistory
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf"; // Importez cette icône
import StarBorderIcon from "@mui/icons-material/StarBorder"; // Importez cette icône

import "./TopProducts.style.css";

const products = [
  {
    id: 1, // Ajoutez cet identifiant
    name: "Truffle Oil",
    image: "images/TruffeOil1.png",
    rating: 5,
    reviews: 15,
    price: "$35",
  },
  {
    id: 2, // Ajoutez cet identifiant
    name: "Saffron",
    image: "images/Saffran1.png",
    rating: 4.5,
    reviews: 27,
    price: "$55",
  },
  {
    id: 3, // Ajoutez cet identifiant
    name: "Vanilla",
    image: "images/Vanille1.png",
    rating: 4.5,
    reviews: 30,
    price: "$50",
  },
];


const TopProducts = () => {
  const navigate = useNavigate()

  // Fonction pour gérer le clic sur le bouton "Buy Now"
  const handleBuyNowClick = (productId) => {
    navigate(`/product/${productId}`); // Navigue vers la page du produit avec l'ID du produit
  };

  return (
    <div className="top-products">
      <Typography variant="h4" component="h2" gutterBottom>
        Our Bestsellers
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => ( // Utilisez product.id pour la key
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <Box className="product-info">
                <Typography gutterBottom variant="h5" component="h3">
                  {product.name}
                </Typography>
                <Box className="product-rating">
                  <Rating
                    name="read-only"
                    value={product.rating}
                    precision={0.5}
                    readOnly
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    icon={<StarIcon fontSize="inherit" />}
                    halfIcon={<StarHalfIcon fontSize="inherit" />}
                  />

                  <Typography
                    className="product-reviews"
                    sx={{
                      fontFamily: "Cursive", // Remplacez 'Cursive' par le nom de votre police personnalisée
                      fontStyle: "italic",
                      // Ajoutez d'autres styles que vous souhaitez appliquer
                    }}
                  >
                    ({product.reviews} Reviews)
                  </Typography>
                </Box>
                <Typography
                  className="product-price"
                  component="p"
                  sx={{
                    fontFamily: "Serif", // Remplacez 'Serif' par le nom de votre police personnalisée
                    fontSize: "1.5rem",
                    // Ajoutez d'autres styles que vous souhaitez appliquer
                  }}
                >
                  {product.price}
                </Typography>

                <Button
                variant="contained"
                color="button"
                sx={{ mt: 1 }}
                onClick={() => handleBuyNowClick(product.id)} // Ajoutez l'ID du produit ici
              >
                Buy Now
              </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TopProducts;
