import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  useStripe,
  useElements,
  Elements,
  CardElement,
} from "@stripe/react-stripe-js";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import theme from "../theme";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import InfoIcon from "@mui/icons-material/Info";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51OdXxoEJHb46mWX28aCoRIUGkvk3bo2q7SzVmoMXvh3OzFT0KmzKuKOhXnwK2j5xVbR0fKyzgR12O5u5MBV9yX6400t3rkjhnR"
);

const CheckoutForm = ({ total }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    message: "",
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/");
  };
  const stripe = useStripe();
  const elements = useElements();
  const totalInCents = total * 100;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!stripe || !elements) {
      return;
    }

    // Appel à votre API pour récupérer les informations de l'utilisateur
    const userInfo = await axios
      .get("//localhost:5000/api/user-info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur",
          error
        );
        return {}; // Retourne un objet vide en cas d'erreur
      });

    const billingDetails = {
      name: `${userInfo.firstName} ${userInfo.lastName}`,
      // Vous pouvez ajouter d'autres détails de facturation ici
    };

    // Appel à votre API pour créer une intention de paiement
    const {
      data: { clientSecret },
    } = await axios.post("//localhost:5000/api/payment", {
      amount: totalInCents,
    });

    // Confirmation du paiement avec Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Paiement réussi");
        // Mettez à jour le contenu de la boîte de dialogue et ouvrez-la
        setDialogContent({
          title: "Paiement Réussi",
          message:
            "Votre paiement a été traité avec succès. Vous recevrez une confirmation par email.",
        });
        handleOpenDialog();
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement options={{ style: { base: { fontSize: "18px" } } }} />
        <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Payer
        </Button>
      </form>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogContent.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const PaymentPage = () => {
  const [activeStep] = useState(2);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    console.log("Fetching latest order details");
    fetch("//localhost:5000/api/latest-order", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log("Received response for latest order:", response);
        if (!response.ok) {
          console.error("Response not OK:", response.statusText);
          throw new Error("Problème de réseau ou réponse non-OK");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Latest order details received:", data);
        if (data.error) {
          console.error("Error in order details:", data.error);
          throw new Error(data.error);
        }
        setOrderDetails(data);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des informations de commande:",
          error
        )
      );
  }, []);

  // Calcul des frais de livraison
  const shippingCost = orderDetails?.shipping_method === "express" ? 10 : 5;

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
      <Box sx={{ flexGrow: 1, mx: 2, display: "flex", alignItems: "center" }}>
        {" "}
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
        <PaymentIcon color={activeStep >= 1 ? "primary" : "disabled"} />
        <Typography variant="caption" sx={{ mt: 1 }}>
          Payment
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Container component="main" sx={{ maxWidth: "md", mt: 4, mb: 4 }}>
      <ProgressBar />
      <Typography component="h1" variant="h4" align="center" sx={{ mb: 4 }}>
        Paiement
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Card sx={{ mb: 3, p: 2, width: "100%", maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Résumé de la commande
            </Typography>
            <List disablePadding>
              {/* Affichage des produits */}
              {orderDetails?.products?.map((product, index) => (
                <ListItem key={index} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={product.name}
                    secondary={`Quantité: ${product.quantity}`}
                  />
                  <Typography variant="body2">
                    €{product.price.toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
              <Divider />
              {/* Affichage des frais de livraison */}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Frais de livraison" />
                <Typography variant="body2">
                  €{shippingCost.toFixed(2)}
                </Typography>
              </ListItem>
              <Divider />
              {/* Affichage du total */}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1">
                  €{orderDetails?.total?.toFixed(2)}
                </Typography>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Card sx={{ mb: 2, p: 2, width: "100%", maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Détails de paiement
            </Typography>
            <Elements stripe={stripePromise}>
              <CheckoutForm total={orderDetails?.total} />
            </Elements>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default PaymentPage;
