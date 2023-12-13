// Import des composants React nécessaires
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductOverview from './ProductOverview/ProductOverview';
import ProductDetail from './ProductDetail/ProductDetail';

const ProductPage = () => {
  const { id } = useParams(); // Cela récupérera l'ID du produit de l'URL

  return (
    <>
      <ProductOverview productId={id} /> {/* Transmettez l'ID au composant ProductOverview */}
      <ProductDetail productId={id} /> {/* Transmettez l'ID au composant ProductDetail */}
    </>
  );
};

export default ProductPage;