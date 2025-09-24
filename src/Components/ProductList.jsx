// src/components/ProductList.jsx

// Imports
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import LoadingError from "./LoadingError";

// Productlist component displaying all products in a grid
// State varibles for product data, loading status, and error handling
function ProductList() {
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
      .catch((error) => {
        // Log error for debugging
        console.error(error);
        // Show error message to user if fetch fails
        setError("Failed to fetch products");
        // Stop showing loading state
        setLoading(false);
      });
    // Empty dependency array means this runs only once on mount
  }, []);

  {
    /* --- Loading/Error Message Component - show user before rendering products --- */
  }
  if (loading || error) {
    return <LoadingError loading={loading} error={error} />;
  }

  // Render product grid once data is loaded
  return (
    <>
      <Container className="mt-5">
        <Row>
          {/* Map over all products and display them in Bootstrap columns */}
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-3 d-flex">
              {/* Individual product card */}
              <Card className="product-card flex-fill d-flex flex-column">
                {/* Product image */}
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  style={{ objectFit: "contain", height: "200px" }}
                />
                {/* Card body with product title & price */}
                <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                  </div>
                </Card.Body>

                {/* Button (styled as a link) to navigate to the product details page */}
                <Link className="btn-product0" to={`/products/${product.id}`}>
                  View Details
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ProductList;
