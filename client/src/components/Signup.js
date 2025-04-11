import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // assuming you have a cute aesthetic css

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    productType: "",
    productName: "",
    imageUrl: "",
    location: "",
    price: "",
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      role,
      productType,
      productName,
      imageUrl,
      location,
      price,
    } = formData;

    if (!name || !email || !password || !role) {
      return setError("Please fill all required fields.");
    }

    if (role === "artisan" && (!productType || !productName || !imageUrl || !location || !price)) {
      return setError("Please fill all product details.");
    }

    if (!/\d/.test(password)) {
      return setError("Password must contain at least one number.");
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      setSuccessMsg("Signup successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-msg">{error}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />

        <select name="role" onChange={handleChange} value={formData.role}>
          <option value="">Select Role</option>
          <option value="buyer">Buyer</option>
          <option value="artisan">Artisan</option>
        </select>

        {formData.role === "artisan" && (
          <>
            <input
              type="text"
              name="productType"
              placeholder="Product Type (e.g., Pochampally saree)"
              onChange={handleChange}
              value={formData.productType}
            />
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              onChange={handleChange}
              value={formData.productName}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              onChange={handleChange}
              value={formData.imageUrl}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleChange}
              value={formData.location}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={formData.price}
            />
          </>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
