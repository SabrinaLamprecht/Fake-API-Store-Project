// src/components/ProductDetails.jsx

// Imports
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import LoadingError from "./LoadingError";

// Component for displaying details about a single product
function ProductDetails() {
  // Extract product ID from the route (i.e. /products/:id)
  const { id } = useParams();
  const navigate = useNavigate();

  // State varibles for product data, loading status, and error handling
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variables for success/error messages for add to cart and delete buttons
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartError, setCartError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Fetch product details when the component mounts or when "id" changes
  useEffect(() => {
    // Safety check: if no id, don’t fetch
    if (!id) return;

    axios
      // Make GET request to Fake Store API
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        // Save API data into state
        setProduct(response.data);
        // Stop showing loading state
        setLoading(false);
      })
      .catch((error) => {
        // Log error for debugging
        console.error(error);
        // Show error message to user if fetch fails
        setError("Failed to load product details.");
        // Stop showing loading state
        setLoading(false);
      });
    // id in the dependency array means this will run again whenever the id in the URL changes
  }, [id]);

  {
    /* --- Loading/Error Message Component - show user before rendering products --- */
  }
  if (loading || error) {
    return <LoadingError loading={loading} error={error} />;
  }

  // Add to Cart button handler
  const handleAddToCart = () => {
    try {
      // Show success message
      setAddedToCart(true);
      // Clear previous errors
      setCartError(null);

      // Auto-hide success message after 3 seconds
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (err) {
      // Log error for debugging
      console.error(err);
      // Show error message to user if action fails
      setCartError("Could not add product to cart.");
    }
  };

  // Delete Product button handler
  const handleDeleteProduct = async () => {
    try {
      // Delete API call
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      // Show success message
      setDeleted(true);
      // Clear previous errors
      setDeleteError(null);

      // Redirect back to product list after 2 seconds
      setTimeout(() => navigate("/products"), 2000);
    } catch (err) {
      // Log error for debugging
      console.error(err);
      // Show error message to user if action fails
      setDeleteError("Error deleting product. Please try again.");
    }
  };

  // Render product details in a styled card
  return (
    <Container
      className="mt-5 d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 80px)", paddingBottom: "3rem" }}
    >
      {/* Success/Error Message Components */}
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

          {/* Add to Cart button */}
          <div className="d-flex justify-content-center gap-2 mt-3">
            <button className="btn-product0" onClick={handleAddToCart}>
              Add to Cart
            </button>

            {/* Edit Product button */}
            <button
              className="btn-product1"
              onClick={() => navigate(`/products/${id}/edit`)}
            >
              Edit Product
            </button>

            {/* Delete Product button */}
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
