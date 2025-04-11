import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MapPage from "./components/MapPage";
import ProductShop from "./components/ProductShop";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/product/:productType" element={<ProductShop />} />
      </Routes>
    </Router>
  );
}

export default App;
