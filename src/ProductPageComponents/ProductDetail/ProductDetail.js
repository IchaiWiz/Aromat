import React, { useState, useEffect } from "react";
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
import ThermostatIcon from "@mui/icons-material/Thermostat";
import BedtimeIcon from "@mui/icons-material/Bedtime";

// Icon mapping
const iconMapping = {
  LocalShippingIcon: LocalShippingIcon,
  SupportAgentIcon: SupportAgentIcon,
  RefreshIcon: RefreshIcon,
  NatureIcon: NatureIcon,
  HourglassEmptyIcon: HourglassEmptyIcon,
  CakeIcon: CakeIcon,
  ThermostatIcon: ThermostatIcon,
  BedtimeIcon: BedtimeIcon,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-detail-tabpanel-${index}`}
      aria-labelledby={`product-detail-tab-${index}`}
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

export default function ProductDetail({ productId }) {
  const [value, setValue] = useState(0);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/product-minidetails/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
      })
      .catch((error) => console.error("There was an error fetching the product details:", error));
  }, [productId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Dynamically generate the list items
  const generateListItems = (type) => {
    return details
      .filter((detail) => detail.detail_type === type)
      .map((detail, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            {React.createElement(iconMapping[detail.icon])}
          </ListItemIcon>
          <ListItemText primary={detail.title} secondary={detail.description} />
        </ListItem>
      ));
  };

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <AppBar position="static" color="default" elevation={0}>
        <Tabs value={value} onChange={handleChange} aria-label="product details" variant="fullWidth">
          <Tab label="How to Use" {...a11yProps(0)} />
          <Tab label="Delivery & Returns" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Divider variant="middle" />
      <TabPanel value={value} index={0}>
        <Typography variant="h6" align="center" gutterBottom>
          How to Use
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <List>
            {generateListItems("use")}
          </List>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6" align="center" gutterBottom>
          Delivery & Returns
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <List>
            {generateListItems("delivery")}
          </List>
        </Box>
      </TabPanel>
    </Box>
  );
}
