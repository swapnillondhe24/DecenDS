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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faXmark,
  faCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function ShortenText({ text, maxLength }) {
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  return <span>{`${text.substring(0, maxLength)}...`}</span>;
}

function Header(props) {
  const [copyStatus, setCopyStatus] = useState("");

  const handleCopyText = (e) => {
    navigator.clipboard
      .writeText(props.peerId)
      .then(() => setCopyStatus("Copied"))
      .catch(() => setCopyStatus("Copy failed."));
  };
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
  const popperConfig = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [-1000, 0], // Adjust the first value to move the dropdown towards the left
        },
      },
    ],
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
                color: "#541b81",
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
              title={<FontAwesomeIcon icon={faUser} size="2xl" />}
              className="pull-left"
              id="basic-nav-dropdown"
              align="end"
            >
              <div className="position-absolute start-0 bg-white border-2 border-black width-auto">
                <NavDropdown.Item>
                  Peer Id :
                  <ShortenText text={props.peerId} maxLength={5} />
                  {!copyStatus ? (
                    <button onClick={handleCopyText}>
                      <FontAwesomeIcon icon={faClipboard} />
                    </button>
                  ) : copyStatus === "Copied" ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} />
                  )}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  Coins Earned : {props.coins_earned}
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
              </div>
            </NavDropdown>
          </Navbar.Collapse>
        ) : (
          <Link to="/signin" className="regLink">
            <div className="nav-btn">Login</div>
          </Link>
        )}

        {/* After Login */}
      </Container>
    </Navbar>
  );
}

export default Header;
