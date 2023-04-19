import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../images/logo.png";
import user from "../images/user.png";

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
            <Link to="/dashboard" className="nav-item">
              Dashboard
            </Link>
          </Navbar.Text>
          <Navbar.Text
            className="nav-option"
            style={{
              color: "#fff8f8",
              fontFamily: "PT Sans Caption",
              fontWeight: 400,
            }}
          >
            <Link to="/documentation" className="nav-item">
              Documentation
            </Link>
          </Navbar.Text>
          <Link to="/signup" className="regLink">
            <div className="nav-btn">Sign Up</div>
          </Link>

          {/* After Login */}

          <NavDropdown
            title={
              <div className="pull-left ">
                <img
                  className="thumbnail-image"
                  src={user}
                  alt="user"
                  style={{ width: "48spx", height: "48px" }}
                />
              </div>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item>Logout</NavDropdown.Item>
            <NavDropdown.Item>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "#541b81" }}
              >
                View Profile
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link
                to="/host"
                style={{ textDecoration: "none", color: "#541b81" }}
              >
                Host a Node
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
