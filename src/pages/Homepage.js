// SellerDashboard.js
import React from 'react';
import UserStatus from '../components/UserStatus';
import ProductList from '../components/ProductList';

function Homepage() {
  return (
    <div>
        <UserStatus/>
        <ProductList/>
    </div>
  );
}

export default Homepage;
