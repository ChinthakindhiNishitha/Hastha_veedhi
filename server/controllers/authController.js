const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
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
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use." });

    if (!/\d/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one number.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    if (role === "artisan") {
      userData.product = { productType, productName, imageUrl, location, price };
    }

    const user = await User.create(userData);

    // Save the product to products collection too
    if (role === "artisan") {
      await Product.create({
        artisanId: user._id,
        productType,
        productName,
        imageUrl,
        location,
        price,
      });
    }

    res.status(201).json({ message: "Signup successful. Please log in." });
  } catch (err) {
    res.status(500).json({ message: "Signup failed.", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Login failed.", error: err.message });
  }
};

module.exports = { signup, login };
