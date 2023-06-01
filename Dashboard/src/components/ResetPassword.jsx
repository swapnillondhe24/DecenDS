import React, { useState } from "react";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [resetError, setResetError] = useState("");

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
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Password reset successful
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
    <div>
      <input
        type="email"
        placeholder="Enter registered email"
        value={email}
        onChange={handleEmailChange}
      />
      {!otpSent ? (
        <button onClick={handleSendOtp}>Send OTP</button>
      ) : (
        <form>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
          {verificationError && <p>{verificationError}</p>}
          {resetError && <p>{resetError}</p>}
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
