import React, { useState } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Button,
  Menu,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import theme from "../../theme";

const ShopSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [checkedFilters, setCheckedFilters] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (event) => {
    setCheckedFilters({
      ...checkedFilters,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
        mb: 4,
        position: "relative",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
          p: "6px 10px",
          display: "flex",
          alignItems: "center",
          width: 400,
          borderRadius: "30px",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
          },
          ".MuiIconButton-root": {
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Recherche..."
          inputProps={{ "aria-label": "recherche" }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button
        aria-controls="filter-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleFilterClick}
        sx={{
          ml: 2,
          height: 60,
          backgroundColor: theme.palette.secondary.light,
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      >
        <FilterListIcon />
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {             
              marginLeft: "17px",
              maxHeight: "none", // Permettre une hauteur plus grande
              width: "fit-content", // Ajuster la largeur au contenu
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "10px",
            marginRight: "10px",
            height: 44,
          }}
        >
          {Object.entries(checkedFilters).map(
            ([filter, isChecked], index, array) => (
              <React.Fragment key={filter}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      name={filter}
                    />
                  }
                  label={filter.charAt(0).toUpperCase() + filter.slice(1)}
                />
              </React.Fragment>
            )
          )}
        </Box>
      </Menu>
    </Box>
  );
};

export default ShopSearch;
