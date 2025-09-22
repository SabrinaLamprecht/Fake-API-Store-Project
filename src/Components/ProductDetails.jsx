// src/components/ProductDetails.jsx

// Imports
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";

// Component for displaying details about a single product
function ProductDetails() {
  // Extract product ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate();
  // State to hold fetched product data
  const [product, setProduct] = useState(null);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for handling errors
  const [error, setError] = useState(null);

  // Success/error messages for actions
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartError, setCartError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Fetch product details when the component mounts or when "id" changes
  useEffect(() => {
    // Safety check in case no ID is provided
    if (!id) return;

    axios
      // Fetch product by ID
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        // Store product in state
        setProduct(response.data);
        // Stop loading
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        // Show error message if fetch fails
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  // Show loading or error messages if needed
  if (loading || error || !product) {
    return (
      <Container
        className="d-flex flex-column align-items-center justify-content-center mt-5"
        style={{ minHeight: "calc(100vh - 80px)", paddingBottom: "3rem" }}
      >
        {loading && <p>Loading product...</p>}
        {error && (
          <ErrorMessage message={error} onClose={() => setError(null)} />
        )}
        {!loading && !error && !product && <p>No product data available.</p>}
      </Container>
    );
  }

  // Add to Cart button handler
  const handleAddToCart = () => {
    try {
      setAddedToCart(true);
      setCartError(null);

      // Auto-hide success message after 3 seconds
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (err) {
      console.error(err);
      setCartError("Could not add product to cart.");
    }
  };

  // Delete Product button handler
  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setDeleted(true);
      setDeleteError(null);

      // Redirect to product list after 2 seconds
      setTimeout(() => navigate("/products"), 2000);
    } catch (err) {
      console.error(err);
      setDeleteError("Error deleting product. Please try again.");
    }
  };

  // Render product details in a styled card
  return (
    <Container
      className="mt-5 d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 80px)", paddingBottom: "3rem" }}
    >
      {/* Success/Error Messages */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          marginBottom: "1.5rem", // space between messages and card
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center", // center messages horizontally
        }}
      >
        {addedToCart && (
          <SuccessMessage
            message="Product added to cart successfully!"
            onClose={() => setAddedToCart(false)}
          />
        )}
        {cartError && (
          <ErrorMessage
            message={cartError}
            onClose={() => setCartError(null)}
          />
        )}
        {deleted && (
          <SuccessMessage
            message="Product deleted successfully!"
            onClose={() => setDeleted(false)}
          />
        )}
        {deleteError && (
          <ErrorMessage
            message={deleteError}
            onClose={() => setDeleteError(null)}
          />
        )}
      </div>
      <Card
        className="product-card p-3"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        {/* Product image */}
        <Card.Img
          className="product-image"
          variant="top"
          src={product.image}
          alt={product.title}
        />
        {/* Product details */}
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            <strong>Description:</strong> {product.description}
          </Card.Text>
          <Card.Text>
            <strong>Category: </strong> {product.category}
          </Card.Text>
          <Card.Text>
            <strong>Price: </strong> ${product.price}
          </Card.Text>

          {/* Action buttons */}
          <div className="d-flex justify-content-center gap-2 mt-3">
            <button className="btn-product0" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button
              className="btn-product1"
              onClick={() => navigate(`/products/${id}/edit`)}
            >
              Edit Product
            </button>

            <button className="btn-product2" onClick={handleDeleteProduct}>
              Delete Product
            </button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetails;
