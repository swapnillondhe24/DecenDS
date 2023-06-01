import React, { useState, useContext, useEffect } from "react";
import "./Signin.css";
import logo from "../images/logo2.png";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PasswordContext } from "./PasswordContext";

function Signin() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { updatePassword } = useContext(PasswordContext);

  // const myVariable = process.env.ENDPOINT;
  // console.log(myVariable);

  const navigate = useNavigate();
  const store = async (e) => {
    e.preventDefault();
    setError("");
    console.log(data);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }

    updatePassword(data.password);
  };
  // console.log(`${process.env.ENDPOINT}/login`);

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
          {error && (
            <Alert style={{ marginTop: "10px", marginBottom: "5px" }}>
              {error}
            </Alert>
          )}
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
      <div className="extra"></div>
    </div>
  );
}

export default Signin;
