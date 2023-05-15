import React, { useState } from "react";
import "./Signin.css";
import logo from "../images/logo2.png";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  // const myVariable = process.env.ENDPOINT;
  // console.log(myVariable);

  const navigate = useNavigate();
  const store = async (e) => {
    e.preventDefault();
    console.log(data);

    const response = await fetch("https://mereor.serveo.net/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization" : "",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      console.error(data.message);
    }
  };

  // console.log(`${process.env.ENDPOINT}/login`);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

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
        <div className="form-head">Sign In</div>
        <form method="POST">
          <div className="form-grp">
            <label className="form-label">Username</label>
            <br />
            <input
              type="text"
              placeholder="Enter Username"
              className="form-ip"
              name="username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
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
              name="password"
              value={data.pwd}
              onChange={(e) => setData({ ...data, password: e.target.value })}
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
