import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserStatus() {

  const [username, setUsername] = useState(null);
  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken && decodedToken.username) {
        setUsername(decodedToken.username);
      }
    }

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
        .catch((error) => console.error(error));
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
    <nav className='navbar'>
      <ul>
        {username ? (
          // Show the username and "Logout" button when the user is logged in
          <li>
            <p>Hello, {username}</p>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          // Show the "Login" and "Sign Up" links when the user is not logged in
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default UserStatus;
