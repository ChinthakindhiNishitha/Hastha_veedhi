import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductShop.css"; // Make sure this file is saved in the same folder

const ProductShop = () => {
  const { productType } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const filtered = res.data.filter(
          (product) =>
            product.productType.toLowerCase().replace(/\s+/g, "-") ===
            productType
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [productType]);

  return (
    <div className="shop-page">
      <h2 className="product-title">
        {productType.replace("-", " ").toUpperCase()}
      </h2>

      {products.length === 0 ? (
        <p className="no-products">No products available for this type.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="product-img"
              />
              <h3 className="product-name">{product.productName}</h3>
              <p className="artisan"><strong>Artisan:</strong> {product.artisanName || "Unknown"}</p>
              <p className="location"><strong>Location:</strong> {product.location}</p>

              <div className="card-actions">
                <span className="price">₹{product.price}</span>
                <i className="fas fa-heart wishlist"></i>
              </div>

              <button className="buy-button">Buy Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductShop;
