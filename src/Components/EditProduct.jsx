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
  // Extract product ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Component state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  // Tracks loading state while fetching product
  const [loading, setLoading] = useState(true);
  // Tracks success message after updating
  const [success, setSuccess] = useState(false);
  // State for handling errors
  const [error, setError] = useState(null);

  // Fetch product details when component mounts or when "id" changes
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        // Pre-fill form with existing product data
        setProduct(response.data);
        // Stop loading once data is fetched
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  // Handle input field changes (updates product state dynamically)
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission to update product
  const handleSubmit = async (e) => {
    // Prevent default form behavior
    e.preventDefault();
    try {
      // API call to update product
      await axios.put(`https://fakestoreapi.com/products/${id}`, product);
      setSuccess(true);
      setError(null);

      // Redirect after showing success
      setTimeout(() => navigate(`/products/${id}`), 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to update product. Please try again.");
      setSuccess(false);
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center mt-5"
      style={{ minHeight: "calc(100vh - 80px)", position: "relative" }}
    >
      {/* --- Messages at the top --- */}
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

      {/* --- Form --- */}
      <div
        className="form-container"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h2>Edit Product</h2>
        <Form onSubmit={handleSubmit} className="form-border">
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

          {/* --- Button --- */}
          <button className="btn-product0" type="submit">
            Save Changes
          </button>
        </Form>
      </div>
    </Container>
  );
}

export default EditProduct;
