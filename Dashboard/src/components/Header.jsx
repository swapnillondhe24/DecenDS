import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../images/logo2.png";
import user from "../images/user.png";
import jwtDecode from "jwt-decode";

function Header(props) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   setIsLoggedIn(loggedIn);
  // }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    try {
      const decoded = jwtDecode(token);
      const now = Date.now().valueOf() / 1000;
      if (typeof decoded.exp !== "undefined" && decoded.exp < now) {
        return null;
      }
      return decoded;
    } catch (err) {
      return null;
    }
  };

  const currentUser = checkAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand href="#home" className="nav-heading">
          <Link to="/" className="regLink">
            <img src={logo} alt="logo image" className="logo-img" />
          </Link>
          {/* DecenDS */}
        </Navbar.Brand>
        <Navbar.Toggle />

        {currentUser ? (
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
              <NavDropdown.Item>{props.peerId}</NavDropdown.Item>
              <NavDropdown.Item>{props.coins_earned}</NavDropdown.Item>

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
              <NavDropdown.Item>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "#fff",
                    border: "none",
                    color: "#541b81",
                    marginLeft: "0",
                  }}
                >
                  Logout
                </button>
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        ) : (
          <Link to="/signup" className="regLink">
            <div className="nav-btn">Sign Up</div>
          </Link>
        )}

        {/* After Login */}
      </Container>
    </Navbar>
  );
}

export default Header;
