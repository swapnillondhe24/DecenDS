import React, { useState, useContext } from "react";
import "./Signin.css";
import logo from "../images/logo2.png";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function CreateNewPassword() {
  const [data, setData] = useState({
    password: "",
    cpassword: "",
  });

  return (
    <div className="signin">
      <Link to="/" className="regLink">
        <img
          src={logo}
          alt="logoimg"
          className="logo-img"
          style={{ marginTop: "2rem", height: "100px" }}
        />
      </Link>
      <div className="  login-box">
        <div className="form-head">Create New Password</div>
        <div style={{ textAlign: "left", padding: "0 3rem 1rem 3rem" }}>
          Your new password must be different from previously used passwords.
        </div>
        <form method="POST">
          <div className="form-grp">
            <label className="form-label">New Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter New Password"
              className="form-ip"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <br></br>
          <div className="form-grp">
            <label className="form-label">Confirm New Password</label>
            <br />
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-ip"
              name="cpassword"
              value={data.pwd}
              onChange={(e) => setData({ ...data, cpassword: e.target.value })}
            />
          </div>
          <button type="submit" className="form-btn">
            Reset Password
          </button>
        </form>
      </div>
      <div style={{ height: "20px" }}></div>
    </div>
  );
}

export default CreateNewPassword;
