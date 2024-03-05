import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext'; // Assurez-vous que le chemin d'importation est correct

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.status)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;