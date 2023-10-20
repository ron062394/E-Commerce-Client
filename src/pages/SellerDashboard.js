// SellerDashboard.js
import React from 'react';
import ProductPostingForm from '../components/CreateProductForm';
import UserStatus from '../components/UserStatus';

function SellerDashboard() {
  return (
    <div>
        <UserStatus/>
      <h1>Welcome to the Seller Dashboard</h1>
      <ProductPostingForm/>

    </div>
  );
}

export default SellerDashboard;
