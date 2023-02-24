import React, { useState } from "react";
import "./Signin.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function Signin() {
  const [data, setData] = useState({
    email: "",
    pwd: "",
  });

  function store(e) {
    e.preventDefault();
    console.log(data);
  }

  return (
    <div className="signin">
      <Link to="/" className="regLink">
        <img src={logo} alt="logo image" className="logo-img" />
      </Link>
      <div className="  login-box">
        <div className="form-head">Sign In</div>
        <form>
          <div className="form-grp">
            <label className="form-label">Email</label>
            <br />
            <input
              type="email"
              placeholder="Enter Email"
              className="form-ip"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <br></br>
          <div className="form-grp">
            <label className="form-label">Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              className="form-ip"
              name="pwd"
              value={data.pwd}
              onChange={(e) => setData({ ...data, pwd: e.target.value })}
            />
          </div>
          <button type="submit" className="form-btn" onClick={store}>
            Submit
          </button>
        </form>
      </div>
      <div className="Forgot">
        Forgot your Sign in details?
        <Link to="/reset" className="regLink">
          Reset Password
        </Link>
      </div>
      <div className="Forgot">
        <Link to="/signup" className="regLink">
          Need to create an account?
        </Link>
      </div>
    </div>
  );
}

export default Signin;
