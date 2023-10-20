import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateCategory from './components/CategoryCreationForm';
import CreateProduct from './components/CreateProductForm';
import Homepage from './pages/Homepage'; // Import the Home component
import AddToCart from './components/AddToCart';
import Header from './components/Header/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<Homepage />} /> {/* Route for the Home component */}
        <Route path="/create/category" element={<CreateCategory />} />
        <Route path="/create/product" element={<CreateProduct />} />
        <Route path="/product/:id" element={<AddToCart />} /> {/* Route for the AddToCart component */}
        <Route path="/login" element={<Login />} /> {/* Route for the AddToCart component */}
        <Route path="/signup" element={<Signup />} /> {/* Route for the AddToCart component */}
        <Route path="/shopping-cart" element={<ShoppingCart />} /> {/* Route for the AddToCart component */}
        </Routes>
    </Router>
  );
}

export default App;

