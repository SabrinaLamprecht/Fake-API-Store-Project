// src/components/NavigationBar.jsx

// Imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavigationBar() {
  return (
    // Main Navbar container
    // `expand="lg"` makes it responsive (collapses on small screens)
    // `custom-navbar` applies custom styles (black background, pink text, etc.)
    // `fixed="top"` makes the navbar stick to the top of the page
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      {/* Bootstrap container for spacing and alignment */}
      <Container className="d-flex jusitfy-content-between">
        {/* --- Logo Section --- */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src="src\Components\Cheeky Roots - Logo .png"
            alt="Store Logo"
            width="160"
            height="40"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        {/* --- Hamburger Menu (Mobile Toggle) --- */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
        >
          {/* Custom hamburger icon with 3 bars */}
          <div className="navbar-toggler-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Navbar.Toggle>
        {/* --- Navbar Links (Collapsible on mobile) --- */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" jusitfy-content-around">
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
