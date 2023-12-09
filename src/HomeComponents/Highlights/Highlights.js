import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import './Highlights.style.css';

const Highlights = () => {
  return (
    <section className="highlights">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box className="highlights-image" /> {/* Container pour l'image */}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            The Wonders of Spices: A Gateway to Health and Flavor
          </Typography>
          <Typography variant="body1" paragraph>
            In every pinch of spices lies a world of flavors and health benefits. Spices, the aromatic parts of plants such as seeds, fruits, roots, and bark, have been cherished for centuries not only for culinary enhancement but also for their medicinal properties. 
          </Typography>
          <Typography variant="body1" paragraph>
            Turmeric, with its anti-inflammatory and antioxidant properties, offers therapeutic benefits and is known to boost immunity. Cinnamon, another powerhouse, regulates blood sugar levels and exhibits anti-diabetic effects. Similarly, black pepper, often referred to as the 'king of spices', enhances nutrient absorption and supports digestive health.
          </Typography>
          <Typography variant="body1" paragraph>
            Beyond health, spices bring an unmatchable zest to food. They transform the simplest ingredients into culinary masterpieces, creating an orchestra of flavors in every dish. In the world of spices, every scoop is a step towards a healthier, more flavorful life.
          </Typography>
          <Button variant="outlined" className="highlights-button">
            Learn More
          </Button>
        </Grid>
      </Grid>
    </section>
  );
};

export default Highlights;
