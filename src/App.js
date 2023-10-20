import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage'; // Import the Home component
import Header from './components/Header/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ShoppingCart from './components/ShoppingCart';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ProductPage from './pages/ProductPage';


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<Homepage />} /> {/* Route for the Home component */}
        <Route path="/product/:id" element={<ProductPage />} /> {/* Route for the AddToCart component */}
        <Route path="/login" element={<Login />} /> {/* Route for the AddToCart component */}
        <Route path="/signup" element={<Signup />} /> {/* Route for the AddToCart component */}
        <Route path="/shopping-cart" element={<ShoppingCart />} /> {/* Route for the AddToCart component */}
        <Route path="/seller-dashboard" element={<SellerDashboard />} /> {/* Route for the AddToCart component */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Route for the AddToCart component */}
        <Route path="/user-dashboard" element={<UserDashboard />} /> {/* Route for the AddToCart component */}
        </Routes>
    </Router>
  );
}

export default App;

