import React, { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import logo from "../images/logo2.png";
import { Form, Button } from "react-bootstrap";

function Reset() {
  const [email, setEmail] = useState("");
  const handleReset = () => {
    console.log(email);
  };
  return (
    <div className="signin" style={{ height: "auto" }}>
      <Link to="/" className="regLink">
        <img
          src={logo}
          alt="logoimg"
          className="logo-img"
          style={{ marginTop: "2rem", height: "100px" }}
        />
      </Link>
      <div className="  login-box" style={{ marginBottom: "50px" }}>
        <div className="form-head">Reset Password</div>
        <div style={{ textAlign: "left", padding: "0 3rem 1rem 3rem" }}>
          Enter the email associated with your account and we'll send an email
          with instructtions to reset your password
        </div>
        <form method="POST">
          <div className="form-grp">
            <label className="form-label">Email</label>
            <br />
            <input
              type="email"
              placeholder="Enter Email"
              className="form-ip"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="form-btn" onClick={handleReset}>
            Send Verification Code
          </button>
        </form>
      </div>
      <div style={{ height: "25px" }}></div>
    </div>
  );
}

export default Reset;
