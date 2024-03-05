import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  Paper,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep"; // Changé pour DeleteSweepIcon
import theme from "../../theme";

const ShopSearch = ({ onSearch, onFiltersChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const categories = ["spices", "oils", "ingredients"];
  const sortOptions = [
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value, selectedCategory, selectedSort);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const handleSortSelect = (sort) => {
    setSelectedSort(sort === selectedSort ? "" : sort);
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedSort("");
    onFiltersChange({ category: "", sort: "" });
  };

  // Ensure filters are applied after selection
  React.useEffect(() => {
    onFiltersChange({ category: selectedCategory, sort: selectedSort });
  }, [selectedCategory, selectedSort, onFiltersChange]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 4 }}>
      <Paper
        component="form"
        onSubmit={(e) => e.preventDefault()} // Prevent form submission
        elevation={3}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "auto",
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search products" }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconButton type="button" onClick={() => onSearch(searchTerm, selectedCategory, selectedSort)} aria-label="search">
          <SearchIcon />
        </IconButton>
        <IconButton
          type="button"
          onClick={handleFilterClick}
          aria-label="filter list"
        >
          <FilterListIcon />
        </IconButton>
        <Tooltip title="Clear Filters">
          <IconButton
            type="button"
            onClick={handleResetFilters}
            aria-label="clear filters"
          >
            <DeleteSweepIcon /> {/* Utilisation de DeleteSweepIcon pour plus de clarté */}
          </IconButton>
        </Tooltip>
      </Paper>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
        PaperProps={{ // Ajout d'un fond de couleur pour le menu
          style: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: "0px 8px 16px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Categories</Typography>
          {categories.map((category) => (
            <Button
              key={category}
              sx={{ m: 1 }}
              variant={selectedCategory === category ? "contained" : "outlined"}
              onClick={() => handleCategorySelect(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>Sort By</Typography>
          {sortOptions.map(({ value, label }) => (
            <Button
              key={value}
              sx={{ m: 1 }}
              variant={selectedSort === value ? "contained" : "outlined"}
              onClick={() => handleSortSelect(value)}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default ShopSearch;
