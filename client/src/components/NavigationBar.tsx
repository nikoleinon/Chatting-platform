import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../assets/placeholder-logo.svg";
import "./NavigationBar.css";
import { useLocation } from "react-router";

export function NavigationBar() {
  const location = useLocation();
  const username = sessionStorage.getItem("userName");
  const userRole = sessionStorage.getItem("role");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");
    window.location.href = "/";
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: "650", fontSize: "1.75rem" }}>
          <img src={logo} width="50" className="d-inline-block align-center mx-4" />
          Chatting Platfrom
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto mx-5">
          </Nav>
          {username ? (
            <NavDropdown title={username} id="basic-nav-dropdown">
              {userRole === "admin" && <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>}
              <NavDropdown.Item href="/user">Omat sivut</NavDropdown.Item>
              <NavDropdown.Item href="/chat">Chat</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
