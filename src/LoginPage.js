import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import { useUser } from "./UserContext";
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/'); // Redirection vers la page d'accueil après fermeture du dialogue
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        login(data.token); // Assurez-vous d'ajouter cet appel.
        setOpenDialog(true);
      } else {
        // Gérer les erreurs de connexion ici
        console.error(data);
        alert("Échec de la connexion : " + (data.message || "Veuillez vérifier vos informations"));
      }
      
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur lors de la connexion. Veuillez réessayer plus tard.");
    }
  };

  const handleSignup = () => { 
    navigate('/signup');
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          Connexion
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Se Connecter
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleSignup}
          >
            S'inscrire
          </Button>
        </Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Connexion réussie"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Vous êtes connecté. Vous serez redirigé vers la page d'accueil.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
