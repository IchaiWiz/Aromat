import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box, Rating } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import "./TopProducts.style.css";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://aromat.cloud/api/top-products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('There was an error!', error));
  }, []);

  const handleBuyNowClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="top-products">
      <Typography variant="h4" component="h2" gutterBottom>
        Our Bestsellers
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.product_id}>
            <Box className="product-card">
              <img
                src={product.image_url} // Utilise l'URL de l'image récupérée
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
                  <Typography className="product-reviews" sx={{ fontFamily: "Cursive", fontStyle: "italic" }}>
                    ({product.review} Reviews)
                  </Typography>
                </Box>
                <Typography className="product-price" component="p" sx={{ fontFamily: "Serif", fontSize: "1.5rem" }}>
                  ${product.price}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => handleBuyNowClick(product.product_id)}>
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
