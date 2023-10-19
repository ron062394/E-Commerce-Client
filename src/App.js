import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateCategory from './components/CategoryCreationForm';
import CreateProduct from './components/CreateProductForm';
import Home from './pages/Home'; // Import the Home component
import AddToCart from './components/AddToCart';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create/category" element={<CreateCategory />} />
        <Route path="/create/product" element={<CreateProduct />} />
        <Route path="/product/:id" element={<AddToCart />} /> {/* Route for the AddToCart component */}
        <Route path="/" element={<Home />} /> {/* Route for the Home component */}
      </Routes>
    </Router>
  );
}

export default App;

