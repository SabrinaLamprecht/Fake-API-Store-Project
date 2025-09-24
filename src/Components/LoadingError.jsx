// src/components/LoadingError.jsx

// Imports
import Container from "react-bootstrap/Container";

// Component for displaying loading and error states
function LoadingError({ loading, error }) {
  if (!loading && !error) return null;

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

export default LoadingError;
