const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts } = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getAllProducts); // 👈 add this route

module.exports = router;
