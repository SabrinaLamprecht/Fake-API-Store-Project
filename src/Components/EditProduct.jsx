// src/components/EditProduct.jsx

// Imports
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";

// Component for editing an existing product
function EditProduct() {
  // Extract product ID from the route (i.e. /products/:id/edit)
  const { id } = useParams();
  const navigate = useNavigate();

  // Component state - the product data is pre-filled into the form
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  // State varibles for loading status, success message, and error handling
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product details when the component mounts or when "id" changes
  useEffect(() => {
    axios
      // Make GET request to Fake Store API
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        // Pre-fill form with existing product data
        setProduct(response.data);
        // Stop loading once data is fetched
        setLoading(false);
      })
      .catch((error) => {
        // Log error for debugging
        console.error(error);
        // Stop showing loading state
        setLoading(false);
      });
    // id in the dependency array means this will run again whenever the id in the URL changes
  }, [id]);

  // Handle input field changes (updates product state dynamically as the user types)
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission to update product
  const handleSubmit = async (e) => {
    // Prevent default form behavior (i.e. prevent page reload)
    e.preventDefault();
    try {
      // PUT request to update product
      await axios.put(`https://fakestoreapi.com/products/${id}`, product);
      // Show success message
      setSuccess(true);
      // Clear any previous error
      setError(null);

      // Redirect to the product details after showing success message
      setTimeout(() => navigate(`/products/${id}`), 1500);
    } catch (err) {
      console.error(err);
      // Show error message to user if action fails
      setError("Failed to update product. Please try again.");
      // Hide success state if error occurs
      setSuccess(false);
    }
  };

  // Show loading while fetching data
  if (loading) return <p>Loading product...</p>;

  // Render product edit form
  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center mt-5"
      style={{ minHeight: "calc(100vh - 80px)", position: "relative" }}
    >
      {/* --- Success/Error Messages Component--- */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {success && (
          <SuccessMessage
            message="Product updated successfully!"
            onClose={() => setSuccess(false)}
          />
        )}
        {error && (
          <ErrorMessage message={error} onClose={() => setError(null)} />
        )}
      </div>

      {/* --- Form for editing product --- */}
      <div
        className="form-container"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h2>Edit Product</h2>
        <Form onSubmit={handleSubmit} className="form-border">
          {/* Title field */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
              className="input-small"
            />
          </Form.Group>
          {/* Price field */}
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="input-small"
            />
          </Form.Group>
          {/* Description field */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={product.description}
              onChange={handleChange}
              required
              className="input-small"
            />
          </Form.Group>
          {/* Category field */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="input-small"
            />
          </Form.Group>
          {/* Image URL field */}
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="input-small"
            />
          </Form.Group>

          {/* --- Submit Button --- */}
          <button className="btn-product0" type="submit">
            Save Changes
          </button>
        </Form>
      </div>
    </Container>
  );
}

export default EditProduct;
