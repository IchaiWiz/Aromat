import React, {useState} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import theme from './theme'; 
import HomePage from './HomeComponents/HomePage'; 
import ProductPage from '../src/ProductPageComponents/ProductPage';
import ShopPage from '../src/ShopComponents/ShopPage';
import CheckoutShipping from './Checkout/CheckoutShipping';
import LoginPage from './LoginPage';
import SignupPage from './SignUpPage';
import Layout from './Layout';
import Test from './Test';
import PaymentPage from './Checkout/Payment';
import ProfilPage from './Profil';
import OrdersPage from './OrdersPage';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute'; // Assurez-vous d'importer PrivateRoute correctement
import ProductsManagement from './ProductsManagement';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/test" element={<Test />} />
              {/* Routes protégées */}
              <Route path="/CheckoutShipping" element={<PrivateRoute><CheckoutShipping /></PrivateRoute>} />
              <Route path="/Payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
              <Route path="/profil" element={<PrivateRoute><ProfilPage /></PrivateRoute>} />
              <Route path="/OrdersPage" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
              {/* Route protégée avec restriction de rôle */}
              <Route path="/Dashboard" element={<PrivateRoute allowedRoles={['admin']}><Dashboard /></PrivateRoute>} />
              <Route path="/ProductsManagement" element={<PrivateRoute allowedRoles={['admin']}><ProductsManagement /></PrivateRoute>} />
            </Routes>
          </Layout>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
