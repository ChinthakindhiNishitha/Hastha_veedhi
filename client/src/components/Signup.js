import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    productType: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);

    // TODO: Connect to backend API here
    // After signup:
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <select name="role" required value={formData.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="buyer">Buyer</option>
          <option value="artisan">Artisan</option>
        </select>

        <input
          type="text"
          name="productType"
          placeholder="Product Type (e.g., Pochampally Saree)"
          required={formData.role === 'artisan'}
          value={formData.productType}
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
