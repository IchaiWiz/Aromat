import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SpaIcon from "@mui/icons-material/Spa";
import VerifiedIcon from "@mui/icons-material/Verified";
import NatureIcon from "@mui/icons-material/Nature";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import HealingIcon from "@mui/icons-material/Healing";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RefreshIcon from "@mui/icons-material/Refresh";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CakeIcon from "@mui/icons-material/Cake";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DetailInputField = ({ icon, label, value, onChange, name }) => {
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      name={name}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      sx={{ marginBottom: 2 }} // Ajoutez de l'espace autour de chaque champ
    />
  );
};

const ProductManagement = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    rating: "",
    review: "",
    category: "",
    details: { spa: "", dining: "", quality: "", eco: "", health: "" },
    uses: {
      use1: { title: "", description: "", icon: "" },
      use2: { title: "", description: "", icon: "" },
      use3: { title: "", description: "", icon: "" },
      use4: { title: "", description: "", icon: "" },
    },
    deliveries: { Local: "", Support: "", Refresh: "", Hourglass: "" },
    images: [],
  });

  // Cette fonction gère les changements pour les champs de premier niveau
  const handleInputChange = (e, category = null, subcategory = null) => {
    const { name, value } = e.target;

    if (category && subcategory) {
      setProduct((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [subcategory]: { ...prev[category][subcategory], [name]: value },
        },
      }));
    } else if (category) {
      setProduct((prev) => ({
        ...prev,
        [category]: { ...prev[category], [name]: value },
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Fonction pour gérer les changements dans les sous-objets (details, uses, deliveries)
  const handleNestedChange = (e, category) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [category]: { ...product[category], [name]: value },
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
  
    // Générer des URLs de blob pour la prévisualisation
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
  
    // Mettre à jour l'état avec les fichiers d'image réels
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files], // Ajoute les fichiers d'image réels à l'état
      imagePreviews: [...(prev.imagePreviews || []), ...imagePreviews] // Ajoute les URLs de blob pour la prévisualisation
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Produit à ajouter :", product);
    console.log("Détails du produit :", product.details);
    console.log("Utilisations du produit :", product.uses);
    console.log("Informations de livraison :", product.deliveries);
    console.log("Images du produit :", product.images);

    // Créer un objet FormData pour envoyer les fichiers et les données textuelles
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("rating", product.rating);
    formData.append("review", product.review);
    formData.append("category", product.category);
    formData.append("details", JSON.stringify(product.details));
    formData.append("uses", JSON.stringify(product.uses));
    formData.append("deliveries", JSON.stringify(product.deliveries));

    // Ajouter les images à formData. Supposons que product.images contient les fichiers d'image réels
    product.images.forEach((file, index) => {
      formData.append(`images`, file); // Le nom 'images' correspond à ce que multer s'attend côté serveur
    });

    try {
      const response = await fetch("http://localhost:5000/api/add-product", {
        method: "POST",
        body: formData, // Pas besoin de spécifier le header 'Content-Type', car FormData le fait automatiquement
      });

      if (!response.ok) {
        throw new Error("Erreur réseau ou du serveur");
      }

      const responseData = await response.json();
      console.log("Produit ajouté avec succès:", responseData);
      // Gérer la réussite de l'envoi ici (par exemple, afficher un message de succès, rediriger, etc.)
    } catch (error) {
      console.error("Erreur lors de l'envoi des données du produit:", error);
      // Gérer l'échec de l'envoi ici (par exemple, afficher un message d'erreur)
    }
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, margin: "auto", maxWidth: "100%", flexGrow: 1 }}
    >
      <Typography variant="h4" gutterBottom>
        Gestion des Produits
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        {/* Informations principales du produit */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Informations Principales</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {/* Nom du produit */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom du produit"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>

              {/* Prix */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prix"
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              {/* Stock */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stock"
                  name="stock"
                  type="number"
                  value={product.stock}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              {/* Évaluation */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Évaluation"
                  name="rating"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 5 } }}
                  value={product.rating}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              {/* Nombre d'avis */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre d'avis"
                  name="review"
                  type="number"
                  value={product.review}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              {/* Catégories */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={product.category}
                    onChange={(e) => handleInputChange(e)}
                    name="category"
                    label="Catégorie"
                  >
                    <MenuItem value="spices">Épices</MenuItem>
                    <MenuItem value="oils">Huiles</MenuItem>
                    <MenuItem value="ingredients">Ingrédients</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Détails du produit */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Détails du Produit</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DetailInputField
                  icon={<SpaIcon />}
                  label="SPA"
                  value={product.details.spa}
                  onChange={(e) => handleNestedChange(e, "details")}
                  name="spa"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailInputField
                  icon={<LocalDiningIcon />}
                  label="Dining"
                  value={product.details.dining}
                  onChange={(e) => handleNestedChange(e, "details")}
                  name="dining"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailInputField
                  icon={<VerifiedIcon />}
                  label="Quality"
                  value={product.details.quality}
                  onChange={(e) => handleNestedChange(e, "details")}
                  name="quality"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailInputField
                  icon={<NatureIcon />}
                  label="Eco"
                  value={product.details.eco}
                  onChange={(e) => handleNestedChange(e, "details")}
                  name="eco"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailInputField
                  icon={<HealingIcon />}
                  label="Health"
                  value={product.details.health}
                  onChange={(e) => handleNestedChange(e, "details")}
                  name="health"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Utilisations du produit */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Utilisations du Produit</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={3}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Use 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid item xs={12} sm={12}>
                      <DetailInputField
                        label="Title"
                        value={product.uses.use1.title}
                        onChange={(e) => handleInputChange(e, "uses", "use1")}
                        name="title"
                      />
                      <DetailInputField
                        label="Description"
                        value={product.uses.use1.description}
                        onChange={(e) => handleInputChange(e, "uses", "use1")}
                        name="description"
                      />
                      <FormControl fullWidth>
                        <InputLabel>Icon</InputLabel>
                        <Select
                          value={product.uses.use1.icon}
                          onChange={(e) =>
                            handleInputChange(
                              {
                                target: { name: "icon", value: e.target.value },
                              },
                              "uses",
                              "use1"
                            )
                          }
                          name="icon"
                          label="Icon"
                        >
                          <MenuItem value="ThermostatIcon">
                            <ThermostatIcon></ThermostatIcon>ThermostatIcon
                          </MenuItem>
                          <MenuItem value="CakeIcon">
                            <CakeIcon></CakeIcon>CakeIcon
                          </MenuItem>
                          <MenuItem value="NatureIcon">
                            <NatureIcon></NatureIcon>NatureIcon
                          </MenuItem>
                          <MenuItem value="BedtimeIcon">
                            <BedtimeIcon></BedtimeIcon>BedtimeIcon
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Use 2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid item xs={12} sm={12}>
                      <DetailInputField
                        label="Title"
                        value={product.uses.use2.title}
                        onChange={(e) => handleInputChange(e, "uses", "use2")}
                        name="title"
                      />
                      <DetailInputField
                        label="Description"
                        value={product.uses.use2.description}
                        onChange={(e) => handleInputChange(e, "uses", "use2")}
                        name="description"
                      />
                      <FormControl fullWidth>
                        <InputLabel>Icon</InputLabel>
                        <Select
                          value={product.uses.use2.icon}
                          onChange={(e) =>
                            handleInputChange(
                              {
                                target: { name: "icon", value: e.target.value },
                              },
                              "uses",
                              "use2"
                            )
                          }
                          name="icon"
                          label="Icon"
                        >
                          <MenuItem value="ThermostatIcon">
                            <ThermostatIcon></ThermostatIcon>ThermostatIcon
                          </MenuItem>
                          <MenuItem value="CakeIcon">
                            <CakeIcon></CakeIcon>CakeIcon
                          </MenuItem>
                          <MenuItem value="NatureIcon">
                            <NatureIcon></NatureIcon>NatureIcon
                          </MenuItem>
                          <MenuItem value="BedtimeIcon">
                            <BedtimeIcon></BedtimeIcon>BedtimeIcon
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Use 3</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid item xs={12} sm={12}>
                      <DetailInputField
                        label="Title"
                        value={product.uses.use3.title}
                        onChange={(e) => handleInputChange(e, "uses", "use3")}
                        name="title"
                      />
                      <DetailInputField
                        label="Description"
                        value={product.uses.use3.description}
                        onChange={(e) => handleInputChange(e, "uses", "use3")}
                        name="description"
                      />
                      <FormControl fullWidth>
                        <InputLabel>Icon</InputLabel>
                        <Select
                          value={product.uses.use3.icon}
                          onChange={(e) =>
                            handleInputChange(
                              {
                                target: { name: "icon", value: e.target.value },
                              },
                              "uses",
                              "use3"
                            )
                          }
                          name="icon"
                          label="Icon"
                        >
                          <MenuItem value="ThermostatIcon">
                            <ThermostatIcon></ThermostatIcon>ThermostatIcon
                          </MenuItem>
                          <MenuItem value="CakeIcon">
                            <CakeIcon></CakeIcon>CakeIcon
                          </MenuItem>
                          <MenuItem value="NatureIcon">
                            <NatureIcon></NatureIcon>NatureIcon
                          </MenuItem>
                          <MenuItem value="BedtimeIcon">
                            <BedtimeIcon></BedtimeIcon>BedtimeIcon
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Use 4</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid item xs={12} sm={12}>
                      <DetailInputField
                        label="Title"
                        value={product.uses.use4.title}
                        onChange={(e) => handleInputChange(e, "uses", "use4")}
                        name="title"
                      />
                      <DetailInputField
                        label="Description"
                        value={product.uses.use4.description}
                        onChange={(e) => handleInputChange(e, "uses", "use4")}
                        name="description"
                      />
                      <FormControl fullWidth>
                        <InputLabel>Icon</InputLabel>
                        <Select
                          value={product.uses.use4.icon}
                          onChange={(e) =>
                            handleInputChange(
                              {
                                target: { name: "icon", value: e.target.value },
                              },
                              "uses",
                              "use4"
                            )
                          }
                          name="icon"
                          label="Icon"
                        >
                          <MenuItem value="ThermostatIcon">
                            <ThermostatIcon></ThermostatIcon>ThermostatIcon
                          </MenuItem>
                          <MenuItem value="CakeIcon">
                            <CakeIcon></CakeIcon>CakeIcon
                          </MenuItem>
                          <MenuItem value="NatureIcon">
                            <NatureIcon></NatureIcon>NatureIcon
                          </MenuItem>
                          <MenuItem value="BedtimeIcon">
                            <BedtimeIcon></BedtimeIcon>BedtimeIcon
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Livraisons du produit */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Livraisons du Produit</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DetailInputField
                  icon={<LocalShippingIcon />}
                  label="Local"
                  value={product.deliveries.local}
                  onChange={(e) => handleNestedChange(e, "deliveries")}
                  name="Local"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailInputField
                  icon={<SupportAgentIcon />}
                  label="Support"
                  value={product.deliveries.support}
                  onChange={(e) => handleNestedChange(e, "deliveries")}
                  name="Support"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailInputField
                  icon={<RefreshIcon />}
                  label="Refresh"
                  value={product.deliveries.refresh}
                  onChange={(e) => handleNestedChange(e, "deliveries")}
                  name="Refresh"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailInputField
                  icon={<HourglassEmptyIcon />}
                  label="Hourglass"
                  value={product.deliveries.hourglass}
                  onChange={(e) => handleNestedChange(e, "deliveries")}
                  name="Hourglass"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Upload et visualisation des images */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Images du Produit</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  multip
                  type="file"
                  onChange={handleImageChange} // Assurez-vous que ceci est bien ajouté
                />

                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Télécharger des images
                </Button>
              </label>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                {product.imagePreviews?.map((imagePreview, index) => (
                  <Box
                    component="img"
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "4px",
                      objectFit: "cover",
                    }}
                    key={index}
                    src={imagePreview}
                    alt={`Prévisualisation ${index + 1}`}
                  />
                ))}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Button
          type="button" // Changez type à "button" pour éviter de soumettre le formulaire si vous utilisez `type="submit"`, assurez-vous que le formulaire appelle handleSubmit.
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit} // Ajoutez cette ligne pour lier le clic du bouton à la fonction handleSubmit
        >
          Ajouter le produit
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductManagement;
