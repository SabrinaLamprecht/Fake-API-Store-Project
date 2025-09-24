// src/components/SuccessMessage.jsx

// Imports
import Alert from "react-bootstrap/Alert";

// Component for displaying success messages in a dismissible alert bubble
function SuccessMessage({ message, onClose }) {
  return (
    <Alert
      variant="success"
      dismissible
      // Allows closing the bubble
      onClose={onClose}
      className="mt-3"
    >
      {message}
    </Alert>
  );
}

export default SuccessMessage;
