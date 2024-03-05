import React, { useState
} from "react";
import { useNavigate } from "react-router-dom"; // Assurez-vous d'importer useNavigate
import { useUser } from "./UserContext";
import { TextField, Button, Container, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ProfilePage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: "", message: "" });
  const navigate = useNavigate(); // Pour la redirection
  const { user, login } = useUser();
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
  
    try {
        const response = await fetch('//localhost:5000/api/update-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            token,
            email,
            firstName,
            lastName,
            password
          }),
        });
      
        if (response.ok) {
            const data = await response.json();
            setDialogContent({
              title: "Mise à jour réussie",
              message: "Votre profil a été mis à jour avec succès. Vous serez redirigé vers la page d'accueil."
            });
            setOpenDialog(true);
          } else {
            // Gestion des erreurs
            throw new Error("Une erreur est survenue lors de la mise à jour du profil.");
          }
        } catch (error) {
          setDialogContent({
            title: "Erreur",
            message: error.message || "Une erreur est survenue lors de la mise à jour du profil."
          });
          setOpenDialog(true);
        }
      };

      const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate('/'); // Redirige vers la page d'accueil
      };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">Profil</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Prénom"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="lastName"
          label="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Mettre à jour
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
    </Container>
  );
};

export default ProfilePage;
