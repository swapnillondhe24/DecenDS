import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../images/logo.png";

function Header() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home" className="nav-heading">
          <Link to="/" className="regLink">
            <img src={logo} alt="logo image" className="logo-img" />
          </Link>
          {/* DecenDS */}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text
            className="nav-option"
            style={{
              color: "#fff8f8",
              fontFamily: "PT Sans Caption",
              fontWeight: 400,
            }}
          >
            Upload File
          </Navbar.Text>
          <Navbar.Text
            className="nav-option"
            style={{
              color: "#fff8f8",
              fontFamily: "PT Sans Caption",
              fontWeight: 400,
            }}
          >
            Download File
          </Navbar.Text>
          <Navbar.Text
            className="nav-option"
            style={{
              color: "#fff8f8",
              fontFamily: "PT Sans Caption",
              fontWeight: 400,
            }}
          >
            Documentation
          </Navbar.Text>
          <Link to="/signup" className="regLink">
            <div className="nav-btn">Sign Up</div>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
