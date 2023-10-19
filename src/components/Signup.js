import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'buyer',
  });
  const [isSignupSuccess, setIsSignupSuccess] = useState(false); // New state for success message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Successful signup
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token in localStorage
        setIsSignupSuccess(true); // Set the success state
      } else if (response.status === 400) {
        // Handle validation error or other specific error
        const errorData = await response.json();
        console.error('Signup failed. Error data:', errorData);
      } else {
        // Handle other errors (e.g., 500 Internal Server Error)
        console.error('Signup failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {isSignupSuccess && (
        <p style={{ color: 'green' }}>Signup successful! You can now log in.</p>
      )}
      <label>Username:</label>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleInputChange}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleInputChange}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <label>
        Sign-up as:
        <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </label>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
