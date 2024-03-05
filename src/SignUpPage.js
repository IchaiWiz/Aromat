import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import {
  Container, TextField, Button, Typography, Box,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

export default function SignupPage() {
  const { login } = useUser();
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    message: "",
    severity: "success", 
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (dialogContent.severity === "success") {
      navigate("/");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          sign_up_date: new Date().toISOString(),
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        localStorage.setItem('token', data.token);
        login(data.token);
        setDialogContent({
            title: "Inscription Réussie",
            message: "Vous êtes inscrit avec succès. Vous serez redirigé vers la page d'accueil.",
            severity: "success"
        });
        setOpenDialog(true);
      } else if (response.status === 409) { // Email déjà utilisé
        setDialogContent({
          title: "Erreur",
          message: data.error || "Cet email est déjà utilisé.",
          severity: "error"
        });
        setOpenDialog(true);
      } else {
        // Gérer d'autres erreurs potentielles ici
        throw new Error(data.error || "Une erreur est survenue lors de l'inscription.");
      }
      
    } catch (error) {
      setDialogContent({
        title: "Erreur",
        message: error.message,
        severity: "error"
      });
      setOpenDialog(true);
    }
  };

  const handlelogin = () => {
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(80vh - 400px)",
          maxWidth: "400px",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Inscription
        </Typography>
        <Box component="form" onSubmit={handleSignup}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstName"
            label="Prénom"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastName"
            label="Nom de Famille"
            name="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de Passe"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmer le Mot de Passe"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            S'inscrire
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handlelogin}
          >
            Se connecter
          </Button>
        </Box>
      </Container>
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
    </ThemeProvider>
  );
}
