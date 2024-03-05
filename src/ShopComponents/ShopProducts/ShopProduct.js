import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";

const ReadMore = ({ children }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => setIsReadMore(!isReadMore);

  const cutOff = (text) => {
    const end = text.indexOf(" ", 100);
    return end === -1 ? text : text.slice(0, end) + "...";
  };

  return (
    <Typography variant="body2" color="text.secondary">
      {isReadMore ? cutOff(children) : children}
      <Button color="primary" onClick={toggleReadMore}>
        {isReadMore ? "lire la suite" : "lire moins"}
      </Button>
    </Typography>
  );
};

const ShopProduct = ({ searchTerm, filters }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : "";
    if (filters.category) {
      query += `${query ? "&" : "?"}category=${filters.category}`;
    }
    if (filters.sort) {
      query += `${query ? "&" : "?"}sort=${filters.sort}`;
    }

    const url = `//localhost:5000/api/products${query}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erreur lors de la récupération des produits:", error));
  }, [searchTerm, filters]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 1200, margin: "auto" }}>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
              <CardMedia component="img" height="140" image={product.image_url} alt={product.name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <ReadMore>{product.description}</ReadMore>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" startIcon={<ShoppingCartIcon />} onClick={() => handleProductClick(product.product_id)} sx={{ backgroundColor: theme.palette.button.main, "&:hover": { backgroundColor: theme.palette.button.dark } }}>
                  SEE THE PRODUCT
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopProduct;
