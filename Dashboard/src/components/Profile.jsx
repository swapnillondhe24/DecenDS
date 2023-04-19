import React from "react";
import Header from "./Header";
import "./Profile.css";
import profile from "../images/profile.png";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

function Profile() {
  return (
    <div className="profile">
      <Header />
      <div className="profile-bar">Profile</div>
      <div className="profile-image-box">
        <img
          src={profile}
          alt="user profile"
          className="profile-image"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "1px solid #181616",
            marginRight: "20px",
          }}
        />
        <span style={{ marginRight: "80px" }}>Upload a new picture</span>
        <Button className="profile-button">Upload</Button>
      </div>
      <div className="profile-text-box">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="profile-form-label">Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="profile-form-label">
              Email address
            </Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label className="profile-form-label">
              Mobile Number
            </Form.Label>
            <Form.Control type="number" placeholder="Enter Mobile Number" />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Update Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group> */}

          <Button variant="primary" type="submit" className="profile-button">
            Update Information
          </Button>
        </Form>
      </div>
      <div style={{ height: "50px" }}></div>
    </div>
  );
}

export default Profile;
