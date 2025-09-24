// src/components/NavigationBar.jsx

// --- Imports ---
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/Logo.png";

// NavigationBar Component - this component renders the top navbar that is visible on all pages
function NavigationBar() {
  return (
    // Main Navbar container
    // - expand="lg": makes the navbar responsive (collapses on small screens)
    // - className="custom-navbar": applies your custom styles
    // - fixed="top": keeps the navbar fixed at the top of the viewport
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      {/* Container provides spacing and aligns content */}
      <Container className="d-flex justify-content-between">
        {/* --- Logo Section --- */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            // Use the imported logo variable
            src={Logo}
            alt="Store Logo"
            width="160"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* --- Hamburger Menu (Mobile Toggle) --- */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
        >
          {/* Custom hamburger icon using 3 bars */}
          <div className="navbar-toggler-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Navbar.Toggle>

        {/* --- Navbar Links (Collapsible on mobile) --- */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-around">
            {" "}
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/addproduct">Add Product</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
