import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import theme from "./theme";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token non trouvé");
        return;
      }

      try {
        const response = await fetch("//localhost:5000/api/my-orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("La requête a échoué");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const calculateDeliveryDate = (orderDate, deliveryTime) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + deliveryTime);
    return formatDate(date.toISOString());
  };

  // Fonction pour déterminer la couleur et le texte du Chip selon le statut
  const statusChipProps = (status) => {
    switch (status) {
      case "launched":
        return { label: "Lancé", color: "info" };
      case "pending":
        return { label: "En attente", color: "warning" };
      case "completed":
        return { label: "Complété", color: "success" };
      case "cancelled":
        return { label: "Annulé", color: "error" };
      default:
        return { label: "Inconnu", color: "default" };
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mes commandes
      </Typography>
      {orders.map((order) => (
        <TableContainer component={Paper} sx={{ mb: 4 }} key={order.order_id}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date de la commande</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Produits</TableCell>
                <TableCell>Date de livraison prévue</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{formatDate(order.order_date)}</TableCell>
                <TableCell>
                  <Chip {...statusChipProps(order.status)} />
                </TableCell>
                <TableCell>
                  {order.products.map((product, index) => (
                    <Typography
                      key={index}
                      sx={{ fontFamily: theme.typography.fontFamily }}
                    >
                      {product.name} (x{product.quantity})
                    </Typography>
                  ))}
                </TableCell>

                <TableCell>
                  {calculateDeliveryDate(order.order_date, order.delivery_time)}
                </TableCell>
                <TableCell>{order.total}€</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </Container>
  );
};

export default OrdersPage;
