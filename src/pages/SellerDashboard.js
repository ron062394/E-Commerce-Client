// SellerDashboard.js
import React from 'react';
import ProductPostingForm from '../components/CreateProductForm';
import SellerOrderHistory from '../components/SellerOrderHistory'
function SellerDashboard() {
  return (
    <div>
      <h1>Welcome to the Seller Dashboard</h1>
      <ProductPostingForm/>
      <SellerOrderHistory/>
    </div>
  );
}

export default SellerDashboard;
