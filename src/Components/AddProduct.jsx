// src/components/AddProduct.jsx

// Imports
import axios from "axios";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import SuccessMessage from "./SuccessMessage";

function AddProduct() {
  // State for storing the created product after submission
  const [product, setProduct] = useState();
  // State for tracking if the form was successfully submitted
  const [submitted, setSubmitted] = useState(false);
  // State for error messages (if submission fails)
  const [error, setError] = useState(null);
  // State for form input values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  // --- Handle input changes ---
  // Updates the formData state whenever a form field is changed
  const handleChange = (e) => {
    // Get field name & value
    const { name, value } = e.target;
    setFormData({
      // Spread previous state
      ...formData,
      // Update the changed field
      [name]: value,
    });
  };

  // --- Handle form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to Fake Store API with form data
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        formData
      );
      // Log API response for debugging
      console.log(response.data);
      // Store the created product
      setProduct(response.data);
      // Mark as submitted
      setSubmitted(true);
      // Clear any errors
      setError(null);
    } catch (error) {
      // Handle errors and display message
      console.log(error);
      setError("Error submitting form. Please try again: ${error.message}");
      setSubmitted(false);
    }
  };

  return (
    <div className="app-container">
      <Container className="form-container">
        <h2>Add Product</h2>

        {/* Success message */}
        {submitted && (
          <SuccessMessage
            message={`${product.title} created successfully!`}
            onClose={() => setSubmitted(false)}
          />
        )}

        {/* Error message */}
        {error && (
          <Alert variant="danger" dismissible>
            {error}
          </Alert>
        )}

        {/* Form for adding new products */}
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
