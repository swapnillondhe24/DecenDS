import React, { useState } from "react";
import "./Signin.css";
import logo from "../images/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = [];

    if (!validateEmail(data.email)) {
      errors.push("Please enter a valid email address");
      console.log("email invalid");
    }

    if (!validatePassword(data.password)) {
      errors.push(
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number"
      );
      console.log("pwd invalid");
    }
    if (data.password !== data.cPassword) {
      errors.push("Passwords do not match");
      console.log("passwords dont match");
    }

    if (errors.length === 0) {
      fetch("https://mereor.serveo.net/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            navigate("/dashboard");
          } else {
            console.log("Error registering user.");
          }
        })
        .catch((error) => {
          console.error("Error registering user:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="signin">
      <Link to="/" className="regLink">
        <img
          src={logo}
          alt="logoimage"
          className="logo-img"
          style={{ marginTop: "2rem", height: "100px" }}
        />
      </Link>
      <div className="  login-box">
        <div className="form-head">Sign Up</div>
        <form method="POST">
          <div className="form-grp">
            <label className="form-label">Username</label>
            <br />
            <input
              type="text"
              placeholder="Enter Username"
              className="form-ip"
              name="username"
              value={data.name}
              onChange={(e) => setData({ ...data, username: e.target.value })}
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
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className="form-grp">
            <label className="form-label">Confirm Password</label>
            <br />
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-ip"
              name="cpassword"
              value={data.cpassword}
              onChange={(e) => setData({ ...data, cpassword: e.target.value })}
            />
          </div>
          <div className=" check">
            <label>
              <input type="checkbox" /> I agree to Terms of Service and Privacy
              Policy
            </label>
          </div>
          <button type="submit" className="form-btn" onClick={handleFormSubmit}>
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
