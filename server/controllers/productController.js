const Product = require("../models/Product");

// POST: Create a new product
const createProduct = async (req, res) => {
  try {
    const { artisanId, productType, productName, imageUrl, location, price } = req.body;

    if (!artisanId || !productType || !productName || !imageUrl || !location || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newProduct = new Product({
      artisanId,
      productType,
      productName,
      imageUrl,
      location,
      price,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
};

// GET: Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts, // 👈 don't forget this
};
