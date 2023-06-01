import React, { useState, useContext } from "react";
import "./Signin.css";
import logo from "../images/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
// import { PasswordContext } from "./PasswordContext";

function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState([]);
  // const { updatePassword } = useContext(PasswordContext);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const regex_new =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[a-zA-Z0-9]).{8,}$/;
    return regex_new.test(password);
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
    if (data.password !== data.cpassword) {
      errors.push("Passwords do not match");
      console.log("passwords dont match");
    }

    console.log(data.password);
    console.log(data.cpassword);

    if (errors.length === 0) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            navigate("/signin");
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
    // updatePassword(data.password);
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
