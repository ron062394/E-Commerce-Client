import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {useCart} from '../context/CartContext'


function Navbar() {
  const { username  } = useUser();
  const { cart } = useCart()
  const updatedcartCount = cart.cartCount
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading status

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Fetch the user's cart data from the server to get the cart count
    if (token) {
      fetch('/api/cart/view', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.items) {
            const count = data.items.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
          }
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setIsLoading(false); // Mark loading as complete
        });
    } else {
      setIsLoading(false); // No token, loading is still complete
    }
  }, []);



  const handleLogout = () => {
    // Clear the user's authentication token and other data
    localStorage.removeItem('token');
    // Redirect to the login page or perform other desired actions
    window.location.href = '/login'; // Redirect to the login page
  }

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  return (
    <nav className='user-status'>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isLoading ? ( // Show loading message if still loading
          <li>Loading...</li>
        ) : (
          username ? (
            // Show the username and "Logout" button when the user is logged in
            <li className='user-container'>
              <p>Cart{cartCount}</p>
              <p>Hello, {username}</p>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            // Show the "Login" and "Sign Up" links when the user is not logged in
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
