import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
  Paper,
  Container,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import InfoIcon from "@mui/icons-material/Info";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { useUser } from "../UserContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from 'react-router-dom';


const CheckoutShipping = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [activeStep, setActiveStep] = useState(1);
  const [contact, setContact] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [address, setAddress] = useState({
    country: "",
    addressLine: "",
    city: "",
    state: "",
    zip: "",
  });
  const [productsInCart, setProductsInCart] = useState([]);

  const SHIPPING_COSTS = {
    standard: 5.0,
    express: 10.0,
  };

  const [totalWithShipping, setTotalWithShipping] = useState(0);

  useEffect(() => {
    // Calculer le sous-total des produits dans le panier
    const subtotal = productsInCart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    // Calculer le total en ajoutant les frais de livraison
    const total = subtotal + SHIPPING_COSTS[shippingMethod];
    // Mettre à jour l'état avec le nouveau total
    setTotalWithShipping(total);
  }, [productsInCart, shippingMethod]); // Dépendances de l'effet

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    message: "",
    severity: "error", // Utilisez "error" pour les messages d'erreur
  });

  const validateForm = () => {
    // Assurez-vous que tous les champs requis sont remplis
    if (!contact || !address.country || !address.addressLine || !address.city || !address.zip) {
      setDialogContent({
        title: "Informations manquantes",
        message: "Veuillez remplir tous les champs obligatoires avant de continuer.",
        severity: "error",
      });
      setOpenDialog(true);
      return false; // La validation échoue
    }
    return true; // La validation réussit
  };
  

  useEffect(() => {
    // Fonction pour récupérer le résumé de la commande
    const fetchOrderSummary = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      fetch("//localhost:5000/api/order-summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProductsInCart(data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération du résumé de commande:",
            error
          );
        });
    };

    // Déclencher une fois immédiatement avant la mise en place de l'intervalle
    fetchOrderSummary();

    // Configurer l'intervalle
    const intervalId = setInterval(fetchOrderSummary, 1700); // Polling toutes les 5 secondes

    // Fonction de nettoyage pour effacer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => {
    if (!validateForm()) {
      return; // Stoppe l'exécution si la validation échoue
    }
    // Calculez le sous-total sans les frais de livraison
    const subtotal = productsInCart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    // Ajoutez les frais de livraison au sous-total pour obtenir le total
    const total = subtotal + SHIPPING_COSTS[shippingMethod];

    const orderData = {
      userId: user.userId, // Récupérez l'ID utilisateur du contexte
      contactInfo: contact,
      country_region: address.country, // Assurez-vous d'utiliser le bon nom de champ
      addressLine: address.addressLine, // Assurez-vous d'utiliser addressLine ici
      city: address.city,
      zipCode: address.zip,
      shippingMethod: shippingMethod,
      status: "pending", // Le statut initial de la commande
      total: total,
      country: address.country, // Ajoutez le champ manquant pour le pays
    };

    const orderedProducts = productsInCart.map((product) => ({
      productId: product.product_id, // Assurez-vous que ceci correspond au champ renvoyé par l'API
      quantity: product.quantity,
    }));

    // Log pour voir les données envoyées
    console.log("Données de la commande envoyées:", {
      orderData,
      orderedProducts,
    });

    // Faites une requête POST pour créer la commande
    fetch("//localhost:5000/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Envoyez le token JWT dans l'en-tête d'autorisation
      },
      body: JSON.stringify({ ...orderData, products: orderedProducts }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.orderId) {
          console.log("Commande créée avec succès:", data.orderId);
          setActiveStep(activeStep + 1);
          navigate('/payment');
        } else {
          throw new Error("La création de la commande a échoué");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la commande:", error);
        // Ici, gérez l'erreur, par exemple en affichant un message à l'utilisateur
      });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const ProgressBar = () => (
    <Box
      sx={{ display: "flex", alignItems: "center", padding: theme.spacing(2) }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <InfoIcon color={activeStep >= 0 ? "primary" : "disabled"} />
        <Typography variant="caption" sx={{ mt: 1 }}>
          Information
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, mx: 2, display: "flex", alignItems: "center" }}>
        {/* Barre personnalisée */}
        <Box
          sx={{
            width: "100%",
            height: 2,
            bgcolor:
              activeStep >= 1
                ? theme.palette.primary.main
                : theme.palette.grey[300],
            borderRadius: 5,
          }}
        />
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <LocalShippingIcon color={activeStep >= 1 ? "primary" : "disabled"} />
        <Typography variant="caption" sx={{ mt: 1 }}>
          Shipping
        </Typography>
      </Box>
      {/* Étape de paiement, si vous voulez la garder pour l'instant */}
      <Box
        sx={{ flexGrow: 1, mx: 2, display: "flex", alignItems: "center" }}
      ></Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <PaymentIcon color={"disabled"} />
        <Typography variant="caption" sx={{ mt: 1 }}>
          Payment
        </Typography>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <ProgressBar />
        <Paper elevation={3} sx={{ my: 4, p: 4 }}>
          <Box display="flex" justifyContent="space-between" gap={2}>
            <Box flexGrow={1} mr={2}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <RadioGroup
                row
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value)}
              >
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Email"
                />
                <FormControlLabel
                  value="phone"
                  control={<Radio />}
                  label="Phone"
                />
              </RadioGroup>
              <TextField
                required
                id="contact"
                name="contact"
                label={
                  contactMethod === "email" ? "Email Address" : "Phone Number"
                }
                fullWidth
                autoComplete="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <TextField
                required
                id="country"
                name="country"
                label="Country/Region"
                fullWidth
                autoComplete="shipping country"
                value={address.country}
                onChange={handleAddressChange}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="addressLine"
                name="addressLine"
                label="Address"
                fullWidth
                autoComplete="shipping address-line1"
                value={address.addressLine}
                onChange={handleAddressChange}
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    value={address.city}
                    onChange={handleAddressChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="ZIP / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    value={address.zip}
                    onChange={handleAddressChange}
                  />
                </Grid>
              </Grid>
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">Shipping Method</FormLabel>
                <RadioGroup
                  aria-label="shipping-method"
                  name="shippingMethod"
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label="Standard Shipping - $5.00"
                  />
                  <FormControlLabel
                    value="express"
                    control={<Radio />}
                    label="Express Shipping - $10.00"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box minWidth="300px">
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order Summary
                  </Typography>
                  <List disablePadding>
                    {productsInCart.map((product) => (
                      <ListItem key={product.id}>
                        <Typography variant="body1">{product.name}</Typography>
                        <Typography variant="body2">
                          {product.quantity} x ${product.price.toFixed(2)}
                        </Typography>
                      </ListItem>
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <ListItem>
                      <Typography variant="body1">Shipping</Typography>
                      <Typography variant="body2">
                        {shippingMethod === "standard" ? "$5.00" : "$10.00"}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <ListItem>
                        <Typography variant="body1">Total</Typography>
                        <Typography variant="body2">
                          ${totalWithShipping.toFixed(2)}
                        </Typography>
                      </ListItem>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </Box>
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {dialogContent.title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialogContent.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenDialog(false)}
                color="primary"
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CheckoutShipping;
