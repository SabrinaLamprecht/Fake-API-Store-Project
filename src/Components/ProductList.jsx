// src/components/ProductList.jsx

// Imports
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function ProductList() {
  // State to hold product list
  const [products, setProducts] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for handling errors
  const [error, setError] = useState(null);

  // --- Fetch products from FakeStore API on mount ---
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        // Save API data into state
        setProducts(response.data);
        // Stop loading spinner/text
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        // Show error message if fetch fails
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  // --- Loading and error handling ---
  if (loading || error) {
    return (
      <Container
        className="d-flex flex-column align-items-center justify-content-center mt-5"
        style={{ minHeight: "calc(100vh - 80px)", paddingBottom: "3rem" }}
      >
        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Container>
    );
  }

  // --- Render product list ---
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
                {/* Card body with product info */}
                <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                  </div>
                </Card.Body>
                {/* Button (styled link) to product details page */}
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
