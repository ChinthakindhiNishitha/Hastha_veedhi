import React from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const mockProducts = {
  "pochampally-saree": [
    {
      id: 1,
      name: "Elegant Pochampally Saree",
      image: "https://i.imgur.com/w1eM7HR.jpeg",
      description: "Handwoven silk saree with traditional Ikat patterns.",
      artisan: "Radhika from Telangana",
    },
  ],
  "nirmal-painting": [
    {
      id: 2,
      name: "Classic Nirmal Painting",
      image: "https://i.imgur.com/rqS1G2X.jpeg",
      description: "A vibrant painting made with natural colors on softwood.",
      artisan: "Anand from Adilabad",
    },
  ],
  "gadwal-saree": [
    {
      id: 3,
      name: "Rich Gadwal Silk Saree",
      image: "https://i.imgur.com/U5pDCNE.jpeg",
      description: "Gold zari pallu with intricate weaving from Gadwal.",
      artisan: "Lakshmi from Gadwal",
    },
  ],
  "blue-pottery": [
    {
      id: 4,
      name: "Jaipur Blue Pottery Vase",
      image: "https://i.imgur.com/4SxTXUu.jpeg",
      description: "Decorative vase with floral hand-painted designs.",
      artisan: "Mohammed from Jaipur",
    },
  ],
};

const ProductShop = () => {
  const { productType } = useParams();
  const products = mockProducts[productType] || [];

  return (
    <div className="shop-page">
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        {productType.replace("-", " ").toUpperCase()}
      </h2>

      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products available for this type.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Artisan:</strong> {product.artisan}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductShop;

