import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated by verifying the token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the JWT token to get user information (username in this case)
      const decodedToken = parseJwt(token);
      if (decodedToken && decodedToken.username) {
        setUsername(decodedToken.username);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear the user's authentication token and other data
    localStorage.removeItem('token');
    // Redirect to the login page or perform other desired actions
    window.location.href = '/login'; // Redirect to the login page
  };

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  return (
    <nav className='navbar'>
      <ul className=''>
        <li><Link to="/">Home</Link></li>
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
        <li><Link to="/create/category">Create category</Link></li>
        <li><Link to="/create/product">Post item</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
