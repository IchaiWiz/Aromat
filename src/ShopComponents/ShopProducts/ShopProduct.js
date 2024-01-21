import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Box
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import theme from "../../theme";
import "./ShopProduct.style.css";

const products = [
  {
    id: 1,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/TruffeOil1.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
  {
    id: 2,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/TruffeOil2.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
  {
    id: 3,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/TruffeOil3.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
  {
    id: 4,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/TruffeOil4.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
  {
    id: 1,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/Saffran1.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
  {
    id: 2,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/Saffran2.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
  {
    id: 3,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/Saffran3.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
  {
    id: 4,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/Saffran4.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
  {
    id: 1,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/Vanille1.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
  {
    id: 2,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/Vanille2.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
  {
    id: 3,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/Vanille3.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
  {
    id: 4,
    name: "Vanilla Candle",
    price: "$25",
    reviews: 15,
    imageUrl: "../images/Vanille4.png",
    description:
      "Cultivées avec soin et récoltées à la main, nos épices exquises sont sélectionnées pour leur intensité aromatique et leur pureté inégalée, ajoutant une touche de luxe à chaque plat.",
  },
];

const ReadMore = ({ children }) => {
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => setIsReadMore(!isReadMore);
  
    const cutOff = (text) => {
      const end = text.indexOf(" ", 100);
      return end === -1 ? text : text.slice(0, end);
    };
  
    return (
      <Typography variant="body2" color="text.secondary">
        {isReadMore ? `${cutOff(children)}...` : children}
        <Button color="primary" onClick={toggleReadMore}>
          {isReadMore ? "lire la suite" : "lire moins"}
        </Button>
      </Typography>
    );
  };

  const ShopProduct = () => {
    return (
      <Box sx={{ maxWidth: '100%', margin: 'auto' }}> {/* Contrôle le positionnement */}
        <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card className="product-card" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}
                </Typography>
                <ReadMore>{product.description}</ReadMore>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', paddingBottom: theme.spacing(2) }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    backgroundColor: theme.palette.button.main,
                    "&:hover": {
                      backgroundColor: theme.palette.button.dark,
                    },
                  }}
                >
                  Ajouter au panier
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