import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, ListItemIcon } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import ProfileIcon from '@mui/icons-material/Person'; // Exemple d'icône
import SettingsIcon from '@mui/icons-material/Settings'; // Exemple d'icône
import LogoutIcon from '@mui/icons-material/Logout'; // Exemple d'icône
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import theme from '../../theme';
import './Header.style.css';

const pages = ['HOME', 'SHOP'];
const settings = [
  { name: 'PROFILE', icon: <ProfileIcon /> },
  { name: 'ACCOUNT', icon: <SettingsIcon /> },
  { name: 'DASHBOARD', icon: <SettingsIcon /> },
  { name: 'LOGOUT', icon: <LogoutIcon /> },
];



const Header = ({openCart}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Handlers for opening and closing menus
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // Mobile menu
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      {pages.map((page) => (
        <MenuItem key={page} onClick={handleMenuClose}>
          <Typography textAlign="center">{page}</Typography>
        </MenuItem>
      ))}
      <Divider />
      {settings.map((setting) => (
        <MenuItem key={setting.name} onClick={handleMenuClose}>
          <ListItemIcon>{setting.icon}</ListItemIcon>
          <Typography variant="inherit">{setting.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );

  // Desktop menu
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.paper, // Utiliser la couleur du papier de votre thème
        },
      }}
    >
      {settings.map((setting) => (
        <MenuItem key={setting.name} onClick={handleMenuClose}>
          <ListItemIcon>{setting.icon}</ListItemIcon>
          <Typography variant="inherit">{setting.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <div className="header-root">
      <AppBar position="static" color="default" elevation={0} className="appBar" sx={{ backgroundColor: theme.palette.background.default }}>
        <Toolbar>
          <Typography variant="h6" noWrap className="logo" sx={{ flexGrow: 1, fontFamily: 'Playfair Display' }}>
            Aromat
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} sx={{ my: 2, color: theme.palette.primary.main, display: 'block' }}>
                <Link to={page === 'HOME' ? '/' : `/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <IconButton size="large" aria-label="account" onClick={handleProfileMenuOpen} sx={{ color: theme.palette.secondary.main }}>
              <AccountCircle />
            </IconButton>
            <IconButton onClick={openCart} size="large" aria-label="shopping cart" sx={{ color: theme.palette.warning.main }}>
              <ShoppingCart />
            </IconButton>
          </Box>
          <IconButton size="large" edge="end" color="inherit" onClick={handleMobileMenuOpen} sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Header;
