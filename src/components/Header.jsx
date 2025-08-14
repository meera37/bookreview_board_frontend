// src/components/Header.jsx
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#001f3f" }} variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold", color: "#fdf6e3" }}>
          BookVista
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <Nav.Link
                onClick={handleLogout}
                style={{ color: "#fdf6e3", fontWeight: "bold", cursor: "pointer" }}
              >
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: "#fdf6e3", fontWeight: "bold" }}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ color: "#fdf6e3", fontWeight: "bold" }}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
