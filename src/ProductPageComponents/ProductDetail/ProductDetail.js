import React from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  AppBar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RefreshIcon from "@mui/icons-material/Refresh";
import NatureIcon from "@mui/icons-material/Nature";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CakeIcon from "@mui/icons-material/Cake";
import ThermostatIcon from "@mui/icons-material/Thermostat"; // Symbolizes warmth
import BedtimeIcon from "@mui/icons-material/Bedtime"; // Symbolizes

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-detail-tabpanel-${index}`}
      aria-labelledby={`product-detail-tab-${index}`}
      style={{ minHeight: "200px" }} // Fixe la hauteur minimale du panneau
      {...other}
    >
      {value === index && (
        <Box p={3} sx={{ overflowY: "auto" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `product-detail-tab-${index}`,
    "aria-controls": `product-detail-tabpanel-${index}`,
  };
}

export default function ProductDetail() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <AppBar position="static" color="default" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="product details"
          variant="fullWidth"
        >
          <Tab label="How to Use" {...a11yProps(0)} />
          <Tab label="Delivery & Returns" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Divider variant="middle" />
      <TabPanel value={value} index={0}>
        <Typography variant="h6" align="center" gutterBottom>
          Culinary Inspirations
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <List>
            <ListItem>
              <ListItemIcon>
                <ThermostatIcon />
              </ListItemIcon>
              <ListItemText
                primary="Warm Spices"
                secondary="Elevate the warmth in your dishes with a pinch of saffron, perfect for cozy nights."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CakeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Baking with Saffron"
                secondary="Bring a touch of golden luxury to your baking, from bread to festive saffron buns."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NatureIcon />
              </ListItemIcon>
              <ListItemText
                primary="Green Cooking"
                secondary="Our saffron is organically sourced, ensuring your cooking is kind to the planet."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BedtimeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Soothing Infusions"
                secondary="Mix saffron into teas or milks for a soothing bedtime drink that promotes restful sleep."
              />
            </ListItem>
          </List>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6" align="center" gutterBottom>
          Our Promise
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText
                primary="Global Delivery"
                secondary="Enjoy our products anywhere in the world with reliable global shipping."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HourglassEmptyIcon />
              </ListItemIcon>
              <ListItemText
                primary="Timely Delivery"
                secondary="Count on us for a timely delivery, ensuring your spices arrive when you need them."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <RefreshIcon />
              </ListItemIcon>
              <ListItemText
                primary="Easy Returns"
                secondary="If your purchase isn't perfect, our easy returns policy has you covered."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SupportAgentIcon />
              </ListItemIcon>
              <ListItemText
                primary="24/7 Support"
                secondary="Our customer support is available 24/7 to assist with any inquiries or issues."
              />
            </ListItem>
          </List>
        </Box>
      </TabPanel>
    </Box>
  );
}
