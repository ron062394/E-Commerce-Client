import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//Import component
import Header from './pages/Header';
import ShoppingCart from './pages/ShoppingCart';


//Import pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ProductPage from './pages/ProductPage';
import OrderHistory from './components/OrderHistory';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
    </Router>
  );
}

export default App;

