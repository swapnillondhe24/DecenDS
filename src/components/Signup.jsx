import React, { useState } from "react";
import "./Signin.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    pwd: "",
    cpwd: "",
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
        <div className="form-head">Sign Up</div>
        <form>
          <div className="form-grp">
            <label className="form-label">Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter Name"
              className="form-ip"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <br></br>
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
          <div className="form-grp">
            <label className="form-label">Confirm Password</label>
            <br />
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-ip"
              name="cpwd"
              value={data.cpwd}
              onChange={(e) => setData({ ...data, cpwd: e.target.value })}
            />
          </div>
          <div className=" check">
            <label>
              <input type="checkbox" /> I agree to Terms of Service and Privacy
              Policy
            </label>
          </div>
          <button type="submit" className="form-btn" onClick={store}>
            Submit
          </button>
        </form>
      </div>
      <div className="already">
        Already have an account?
        <Link to="/signin" className="regLink">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
