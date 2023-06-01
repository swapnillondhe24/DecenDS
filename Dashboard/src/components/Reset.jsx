import React, { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import logo from "../images/logo2.png";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Reset() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [resetError, setResetError] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSendOtp = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/send_reset_email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data.success) {
          // OTP sent successfully
          console.log("otp sent");
          setOtpSent(true);
          setVerificationError("");
        } else {
          console.log("otp not sent");
          // Error sending OTP
          setOtpSent(false);
          setVerificationError("Error sending OTP");
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  const handleResetPassword = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/verify_otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email, otp, newPassword }),
    })
      .then((response) => {
        response.json();
        navigate("/login");
        console.log("Password reset successful");
        setResetError("");
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          // Password reset successful
          navigate("/login");
          console.log("Password reset successful");
          setResetError("");
        } else {
          // Error resetting password
          setResetError("Error resetting password");
        }
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
      });
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
        <div className="form-grp container" style={{ marginLeft: "2rem" }}>
          {" "}
          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            className="form-ip"
            onChange={handleEmailChange}
          />
        </div>

        {!otpSent ? (
          <button onClick={handleSendOtp} className="form-btn">
            Send OTP
          </button>
        ) : (
          <form method="POST">
            <div className="form-grp container" style={{ marginLeft: "2rem" }}>
              <label className="form-label">Enter OTP</label>
              <br />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                className="form-ip"
              />
            </div>
            <div className="form-grp container" style={{ marginLeft: "2rem" }}>
              <label className="form-label">Enter New Password</label>
              <br />
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="form-ip"
              />
            </div>

            <button onClick={handleResetPassword} className="form-btn">
              Reset Password
            </button>
            {verificationError && <p>{verificationError}</p>}
            {resetError && <p>{resetError}</p>}
          </form>
        )}
      </div>

      <div style={{ height: "25px" }}></div>
    </div>
  );
}

export default Reset;
