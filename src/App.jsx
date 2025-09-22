// src/App.jsx

// Imports

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Components/Home";
import ProductList from "./Components/ProductList";
import AddProduct from "./Components/AddProduct";
import ProductDetails from "./Components/ProductDetails";
import EditProduct from "./Components/EditProduct";

function App() {
  return (
    <div className="app-container">
      <NavigationBar />
      <Router>
        <Routes>
          {/* this is mapping specific routes in the URL to specific route */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
