import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'buyer', // Default role is 'buyer'
  });

  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsLoginSuccess(true);
        // Redirect to the user's dashboard or protected route
      } else if (response.status === 401) {
        console.error('Login failed. Please check your credentials.');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {isLoginSuccess && (
        <p style={{ color: 'green' }}>Login successful! You are now logged in.</p>
      )}
      <label>Email</label>
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
      <label>Role</label>
      <select name="role" value={formData.role} onChange={handleInputChange}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
        <option value="admin">Admin</option> {/* Added 'admin' as an option */}
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
