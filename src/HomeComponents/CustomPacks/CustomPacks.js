import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import GiftIcon from "@mui/icons-material/CardGiftcard";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import CartIcon from "@mui/icons-material/ShoppingCart";
import "./CustomPacks.style.css";

const CustomPacks = () => {
  return (
    <Box className="custom-box">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} className="custom-box-content">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            style={{ color: "#F4C430" }}
          >
            Create Your Own Gift Box
          </Typography>
          <Typography variant="body1" paragraph style={{ color: "#343837" }}>
            We're excited to offer the option to build your own gift box very soon! This feature is under development as we expand our selection. Stay tuned for the opportunity to craft a gift that's uniquely yours.
          </Typography>
          <Typography variant="body1" paragraph style={{ color: "#343837", marginTop: "20px" }}>
            Meanwhile, feel free to explore our current range of artisan gifts.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Box className="step">
                <GiftIcon className="icon" />
                <Typography>Choose box style</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="step">
                <AddIcon className="icon" />
                <Typography>Add artisan gifts</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className="step">
                <CartIcon className="icon" />
                <Typography>Send your gift</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box className="custom-box-button-container">
            <Button
              variant="contained"
              color="button"
              className="custom-box-button"
              disabled={true} // Désactiver le bouton jusqu'à ce que la fonctionnalité soit prête
            >
              Start Building Now
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="custom-box-image" /> {/* Partie pour l'image */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomPacks;
