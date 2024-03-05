import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState({
    pendingOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    customers: 0,
    admins: 0
  });

  const navigateTo = (path) => {
    navigate(path);
  };

  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard-summary');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du tableau de bord:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardInfo = [
    {
      title: 'Commandes en Attente',
      icon: <ShoppingCartIcon fontSize="large" />,
      description: `Total: ${dashboardData.pendingOrders} commandes en attente`,
      path: '/OrdersManagement',
    },
    {
      title: 'Produits en Stock',
      icon: <StorefrontIcon fontSize="large" />,
      description: `Total: ${dashboardData.totalProducts} produits disponibles`,
      path: '/ProductsManagement',
    },
    {
      title: 'Utilisateurs Actifs',
      icon: <PeopleIcon fontSize="large" />,
      description: `Total: ${dashboardData.totalUsers} utilisateurs (Clients: ${dashboardData.customers}, Admins: ${dashboardData.admins})`,
      path: '/UsersManagement',
    },
  ];

  const chartOptions = {
    series: [{
      name: "Total",
      data: [dashboardData.pendingOrders, dashboardData.totalProducts, dashboardData.totalUsers]
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    xaxis: {
      categories: ['Commandes', 'Produits', 'Utilisateurs']
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.info.main]
  };

  return (
    <Box sx={{ flexGrow: 1, m: 3 }}>
      <Typography variant="h4" gutterBottom>
        Administration
      </Typography>
      <Grid container spacing={3}>
        {dashboardInfo.map((info, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                {info.icon}
                <Typography variant="h6" component="div" sx={{ my: 2 }}>
                  {info.title}
                </Typography>
                <Typography variant="body2">
                  {info.description}
                </Typography>
              </CardContent>
              <Button 
                variant="contained" 
                sx={{ m: 2 }} 
                onClick={() => navigateTo(info.path)}>
                Voir plus
              </Button>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Tableau de Bord</Typography>
              <Chart options={chartOptions} series={chartOptions.series} type="bar" height={350} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
