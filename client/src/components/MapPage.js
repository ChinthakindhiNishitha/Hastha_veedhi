import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "../App.css";


// Fixing default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const locations = [
  {
    name: "Pochampally Sarees",
    lat: 17.351, 
    lng: 78.585,
    productType: "pochampally-saree",
    image: "https://img2.exportersindia.com/product_images/bc-full/2018/9/5866774/pochampally-sarees-1536649582-4286433.jpeg"
  },
  {
    name: "Nirmal Paintings",
    lat: 19.096,
    lng: 78.344,
    productType: "nirmal-painting",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPVU17tAQJsLHOvFlXu3-aQOxRnjR4QzqpA&s"
  },
  {
    name: "Gadwal Sarees",
    lat: 16.233,
    lng: 77.805,
    productType: "gadwal-saree",
    image: "https://cdn.shopaccino.com/kusuma/products/img4082-750956_l.jpg?v=523"
  },
  {
    name: "Blue Pottery",
    lat: 26.912,
    lng: 75.787,
    productType: "blue-pottery",
    image: "https://www.samskarahome.com/cdn/shop/products/BluePotteryWallPlates_SetOf6_662b00a3-31b5-4f39-96f1-cf4415d58a6d.jpg?v=1700555166&width=1080"
  },
  {
    "name": "kondapalli toys",
    "lat": 16.6167,
    "lng": 80.5333,
    "productType": "kondapalli-toys",
    "image": "https://www.aljazeera.com/wp-content/uploads/2016/11/73a87c06751943f28511e177b2408aa1_8.jpeg?fit=1170%2C936&quality=80"
  }
  
];

const MapPage = () => {
  const navigate = useNavigate();

  const handleViewProduct = (productType) => {
    navigate(`/product-shop/${productType}`);

  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[17.385, 78.4867]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]}>
            <Popup>
              <div style={{ textAlign: "center" }}>
                <h3>{loc.name}</h3>
                <img src={loc.image} alt={loc.name} style={{ width: "150px", borderRadius: "8px" }} />
                <br />
                <button onClick={() => handleViewProduct(loc.productType)} className="view-product-button">
                  View Product 
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
