// src/components/Home.jsx

// Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

function Home() {
  // State to hold product data
  const [products, setProducts] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for handling errors
  const [error, setError] = useState(null);

  // Fetch product data from Fake Store API when component mounts
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        // Save API data into state
        setProducts(response.data);
        // Stop loading spinner/text
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // Show error message if fetch fails
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* Welcome text */}
        <h1 className="mt-5">Welcome to Cheeky Roots!</h1>
        <p>
          We have a range of products that may interest you! Click on Products
          below to see the full list!
        </p>

        {/* --- Loading/Error Messages --- */}
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}

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
                {/* Product Title + Price Overlay */}
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

        {/* Products button below carousel */}
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
