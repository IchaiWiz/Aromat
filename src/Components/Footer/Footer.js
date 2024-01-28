import React from 'react';
import { Grid, Typography, TextField, Button, Box, Link, Stack } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <footer className="footer">
      <Box sx={{ flexGrow: 1, backgroundColor: '#fffaf0', p: 4, color: '#343837' }}>
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4} md={2}>
            <Typography variant="subtitle1" gutterBottom>
              SUBSCRIBE TO OUR NEWSLETTER
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TextField
                id="subscribe"
                label="Your email"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mr: 1 }}
              />
              <Button variant="contained" size="large" color="button">
                SUBSCRIBE
              </Button>
            </Box>
          </Grid>
          {renderLinksColumn('NAVIGATION', ['Catalog', 'About us'])}
          {renderLinksColumn('CONNECT', ['FAQs', 'Shipping & Returns'])}
          {renderLinksColumn('LEGAL', ['Privacy'])}
          <Grid item xs={12} sm={4} md={2}>
            <Typography variant="subtitle1" gutterBottom>
              FOLLOW US
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1 }}>
              <Link href="#" color="inherit"><InstagramIcon /></Link>
              <Link href="#" color="inherit"><FacebookIcon /></Link>
              <Link href="#" color="inherit"><TwitterIcon /></Link>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
          Aromat©. All rights reserved
        </Typography>
      </Box>
    </footer>
  );
};

// Helper function to render link columns
const renderLinksColumn = (title, links) => (
  <Grid item xs={12} sm={4} md={2}>
    <Typography variant="subtitle1" gutterBottom>
      {title}
    </Typography>
    <Stack direction="column" spacing={1}>
      {links.map((link, index) => (
        <Link key={index} href="#" variant="body2" sx={{ color: '#343837' }}>
          {link}
        </Link>
      ))}
    </Stack>
  </Grid>
);

export default Footer;
