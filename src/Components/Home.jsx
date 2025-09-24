// src/components/Home.jsx

// Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import LoadingError from "./LoadingError";

// Home component displaying welcome text and product carousel
// State varibles for product data, loading status, and error handling
function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data from Fake Store API when component mounts
  useEffect(() => {
    axios
      // Make GET request to Fake Store API
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        // Save API data into state
        setProducts(response.data);
        // Stop showing loading state
        setLoading(false);
      })
      .catch((err) => {
        // Log error for debugging
        console.error(err);
        // Show error message to user if fetch fails
        setError("Failed to load products");
        // Stop showing loading state
        setLoading(false);
      });
    // Empty dependency array means this runs only once on mount
  }, []);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* Welcome section */}
        <h1 className="mt-5">Welcome to Cheeky Roots!</h1>
        <p>
          We have a range of products that may interest you! Click on Products
          below to see the full list!
        </p>

        {/* --- Loading/Error Message Component - show user before rendering products --- */}
        <LoadingError loading={loading} error={error} />

        {/* --- Product Carousel --- */}
        {products.length > 0 && (
          <Carousel
            className="mt-4"
            interval={3000} // Auto-advance every 3 seconds
            controls={true} // Show left/right arrows
            indicators={true} // Show navigation dots
          >
            {products.map((product) => (
              <Carousel.Item key={product.id}>
                {/* Product Image */}
                <img
                  className="d-block w-100"
                  src={product.image}
                  alt={product.title}
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
                {/* Product Title & Price Overlay */}
                <Carousel.Caption
                  style={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    borderRadius: "8px",
                    padding: "1rem",
                  }}
                >
                  <h5 style={{ color: "rgb(254, 189, 199)" }}>
                    {product.title}
                  </h5>
                  <p style={{ color: "rgb(254, 189, 199)" }}>
                    ${product.price}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        {/* Button to navigate to Peroducts page */}
        <div className="mt-4">
          <Link to="/products">
            <button className="btn-product0">Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
