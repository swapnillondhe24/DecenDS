import React, { useState } from "react";
import Header from "./Header";
import "./Profile.css";
import profile1 from "../images/profile1.jpg";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Profile() {
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState();
  const handleCloseUpload = () => setShowUpload(false);
  const handleShowUpload = () => setShowUpload(true);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3000/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <div className="profile">
      <Header />
      <div className="profile-bar">Profile</div>
      <div className="profile-image-box">
        <img
          src={profile1}
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
        <Button className="profile-button" onClick={handleShowUpload}>
          Upload
        </Button>
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

          <Button type="submit" className="profile-button">
            Update Information
          </Button>
        </Form>
      </div>
      <div style={{ height: "50px" }}></div>
      <Modal show={showUpload} onHide={handleCloseUpload} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleChange} />
            <button type="submit">Upload</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpload}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
