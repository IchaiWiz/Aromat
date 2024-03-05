import React, { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  ListItemIcon,
  Button,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import theme from "../../theme";
import "./Header.style.css";
import AddToCartDrawer from "../../ProductPageComponents/AddToCart/AddToCartDrawer";

const Header = ({ openCart }) => {
  const { user, logout } = useUser();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuOpen = (event) =>
    setMobileMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchorEl(null);
  };

  const [isCartOpen, setCartOpen] = useState(false);

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };


  const navigateTo = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const logoutAndNavigate = () => {
    logout();
    navigate("/signup");
  };

  const settings = user
    ? [
        {
          name: `ID: ${user.userId}`,
          icon: <AccountCircleIcon />,
          action: () => {},
        },
        user.status === "admin" && {
          name: "DASHBOARD",
          icon: <DashboardIcon />,
          action: () => navigateTo("/dashboard"),
        },
        {
          name: "PROFILE",
          icon: <PersonIcon />,
          action: () => navigateTo("/profil"),
        },
        {
          name: "ORDERS",
          icon: <ShoppingCartIcon />,
          action: () => navigateTo("/OrdersPage"),
        },
        { name: "LOGOUT", icon: <LogoutIcon />, action: logoutAndNavigate },
      ].filter(Boolean)
    : [
        {
          name: "LOGIN",
          icon: <LogoutIcon />,
          action: () => navigateTo("/login"),
        },
        {
          name: "SIGN UP",
          icon: <LogoutIcon />,
          action: () => navigateTo("/signup"),
        },
      ];


  const renderMenuItem = (setting) => (
    <MenuItem key={setting.name} onClick={setting.action}>
      <ListItemIcon>{setting.icon}</ListItemIcon>
      <Typography textAlign="center">{setting.name}</Typography>
    </MenuItem>
  );

  const renderMenu = (anchor, isMobile = false) => (
    <Menu
      anchorEl={anchor}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobile ? isMobileMenuOpen : isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: { backgroundColor: theme.palette.background.paper },
      }}
    >
      {isMobile
        ? [
            ...["HOME", "SHOP"].map((page) => (
              <MenuItem
                key={page}
                onClick={() =>
                  navigateTo(page === "HOME" ? "/" : `/${page.toLowerCase()}`)
                }
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            )),
            <Divider key="divider" />,
            ...settings.map((setting) => renderMenuItem(setting)),
          ]
        : settings.map((setting) => renderMenuItem(setting))}
    </Menu>
  );

  return (
    <div className="header-root">
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: 3,
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 0, // Empêche "Aromat" de se rétrécir
              minWidth: 100, // Assure un minimum de largeur pour le texte
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Aromat
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              width: "100%",
              flexGrow: 1,
            }}
          >
            {["HOME", "SHOP"].map((page) => (
              <Button
                key={page}
                onClick={() =>
                  navigateTo(page === "HOME" ? "/" : `/${page.toLowerCase()}`)
                }
                sx={{ my: 2, color: "text.primary", mx: 1.5 }}
              >
                {page}
              </Button>
            ))}
            {/* Affichage conditionnel du bouton Dashboard pour les admins */}
            {user && user.status === "admin" && (
              <Button
                onClick={() => navigateTo("/dashboard")}
                sx={{ my: 2, color: "text.primary", mx: 1.5 }}
              >
                DASHBOARD
              </Button>
            )}
          </Box>

          <Box sx={{ display: "flex" }}>
            <IconButton size="large" onClick={handleMenuOpen} color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <IconButton size="large" onClick={handleCartOpen} color="inherit">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <AddToCartDrawer isOpen={isCartOpen} onClose={handleCartClose} />
      {renderMenu(anchorEl)}
      {renderMenu(mobileMenuAnchorEl, true)}
    </div>
  );
};

export default Header;
