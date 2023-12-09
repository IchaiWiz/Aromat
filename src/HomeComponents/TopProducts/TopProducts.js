import React from "react";
import { Grid, Typography, Button, Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf"; // Importez cette icône
import StarBorderIcon from "@mui/icons-material/StarBorder"; // Importez cette icône

import "./TopProducts.style.css";

const products = [
  {
    name: "Truffle Oil",
    image: "images/huiletruffev1.jpg",
    rating: 5,
    reviews: 15,
    price: "$35",
  },
  {
    name: "Saffron",
    image: "images/Safranv1.jpg",
    rating: 4.5,
    reviews: 27,
    price: "$55",
  },
  {
    name: "Vanilla",
    image: "images/vanillev1.jpg",
    rating: 4.5,
    reviews: 30,
    price: "$50",
  },
];

const TopProducts = () => {
  return (
    <div className="top-products">
      <Typography variant="h4" component="h2" gutterBottom>
        Our Bestsellers
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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

                  <Typography>({product.reviews} Reviews)</Typography>
                </Box>
                <Typography variant="body2" component="p">
                  {product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="product-button"
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
