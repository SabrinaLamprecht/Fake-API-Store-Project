// src/components/ErrorMessage.jsx

// Imports
import Alert from "react-bootstrap/Alert";

// Component for displaying error messages in a dismissible alert bubble
function ErrorMessage({ message, onClose }) {
  return (
    <Alert
      variant="danger"
      dismissible
      // Allows closing the bubble
      onClose={onClose}
      className="mt-3"
    >
      {message}
    </Alert>
  );
}

export default ErrorMessage;
