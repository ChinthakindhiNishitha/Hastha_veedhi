const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productType: String,
  productName: String,
  imageUrl: String,
  location: String,
  price: Number,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["buyer", "artisan"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  product: {
    type: productSchema,
    required: function () {
      return this.role === "artisan";
    },
  },
});

module.exports = mongoose.model("User", userSchema);
