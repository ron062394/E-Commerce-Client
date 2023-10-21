// SellerDashboard.js
import React from 'react';
import UserStatus from '../components/UserStatus';
import Home from '../components/ProductList';
import OrderHistory from '../components/OrderHistory';

function SellerDashboard() {
  return (
    <div>
        <UserStatus/>
        <Home/>
        <OrderHistory/>
    </div>
  );
}

export default SellerDashboard;
