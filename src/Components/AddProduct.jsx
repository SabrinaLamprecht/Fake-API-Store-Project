// src/components/AddProduct.jsx

// Imports
import axios from "axios";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";

// AddProduct Component - renders a form to create a new product
function AddProduct() {
  // State varibles for storing the created product after submission, tracking submission status, and error handling
  const [product, setProduct] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Component state - tracks form data for the new product
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  // Handle input changes - updates the formData state whenever the user types in a field
  const handleChange = (e) => {
    // Get field name & value
    const { name, value } = e.target;
    setFormData({
      // Keep previous values
      ...formData,
      // Update the changed field
      [name]: value,
    });
  };

  // --- Handle form submission ---
  const handleSubmit = async (e) => {
    // Prevent default form behavior (i.e. prevent page reload)
    e.preventDefault();

    try {
      // Send POST request to Fake Store API with form data
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        formData
      );
      // Log API response for debugging
      console.log(response.data);
      // Store the created product in state
      setProduct(response.data);
      // Mark form as successfully submitted
      setSubmitted(true);
      // Clear any previous error messages
      setError(null);
    } catch (error) {
      // Handle errors during submission and display message
      console.log(error);
      setError("Error submitting form. Please try again: ${error.message}");
      setSubmitted(false);
    }
  };

  return (
    <div className="app-container">
      <Container className="form-container">
        <h2>Add Product</h2>

        {/* Success message component */}
        {submitted && (
          <SuccessMessage
            message={`${product.title} created successfully!`}
            onClose={() => setSubmitted(false)}
          />
        )}

        {/* Error message component */}
        {error && (
          <ErrorMessage message={error} onClose={() => setError(null)} />
        )}

        {/* Product form for adding new products */}
        <Form onSubmit={handleSubmit} className="form-border">
          {/* Title input */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input-small"
            />
          </Form.Group>

          {/* Description input */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="input-small"
            />
          </Form.Group>

          {/* Category input */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input-small"
            />
          </Form.Group>

          {/* Price input */}
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input-small"
            />
          </Form.Group>

          {/* Image URL input */}
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter an image url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="input-small"
            />
          </Form.Group>

          {/* Submit button */}
          <button className="btn-product0" type="submit">
            Submit
          </button>
        </Form>
      </Container>
    </div>
  );
}

export default AddProduct;
