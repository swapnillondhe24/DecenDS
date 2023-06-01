import React, { useState, useContext } from "react";
import "./Dashboard.css";
import u from "../../images/u.png";
import d from "../../images/d.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DownloadTable from "./DownloadTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { PasswordContext } from "../PasswordContext";
import CryptoJS from "crypto-js";

function Ducards() {
  const [showUpload, setShowUpload] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const { password } = useContext(PasswordContext);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem("token");
  console.log("this is upload password", password);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const handleUploadClick = async (event) => {
    event.preventDefault();
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    const fileBlob = new Blob([file]);
    const fileBuffer = await readFileAsArrayBuffer(fileBlob);

    const encryptedFileBuffer = await encryptFile(fileBuffer, password);
    const formData = new FormData();
    formData.append("file", new Blob([encryptedFileBuffer]));
    formData.append("filename", file.name);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/upload_file`,
        {
          method: "POST",
          body: formData,
          headers: { Authorization: `${token}` },
        }
      );
      console.log(formData);
      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const readFileAsArrayBuffer = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file as ArrayBuffer"));
        }
      };
      reader.onerror = () => {
        reject(new Error("Failed to read file as ArrayBuffer"));
      };
      reader.readAsArrayBuffer(blob);
    });
  };

  const encryptFile = async (fileBuffer, password) => {
    try {
      // Generate a derived key from the user's password
      const keyMaterial = await getKeyMaterial(password);
      const key = await deriveKey(keyMaterial);

      // Create an initialization vector (IV)
      const iv = crypto.getRandomValues(new Uint8Array(16));

      // Encrypt the file using AES-GCM algorithm
      const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        fileBuffer
      );

      // Concatenate the IV and encrypted data
      const encryptedFileBuffer = concatenateBuffers(
        iv,
        new Uint8Array(encryptedData)
      );

      return encryptedFileBuffer;
    } catch (error) {
      console.error("Error occurred while encrypting file:", error);
      throw error;
    }
  };

  // Function to generate a key from the user's password
  const getKeyMaterial = async (password) => {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    const algo = {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: new Uint8Array(16),
      iterations: 100000,
    };

    const derivedKey = await crypto.subtle.importKey(
      "raw",
      passwordBuffer,
      algo,
      false,
      ["deriveKey"]
    );

    return derivedKey;
  };

  // Function to derive the encryption key from the derived key
  const deriveKey = async (derivedKey) => {
    const algo = {
      name: "AES-GCM",
      length: 256,
    };

    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: new Uint8Array(16),
        iterations: 100000,
        hash: "SHA-256",
      },
      derivedKey,
      algo,
      false,
      ["encrypt", "decrypt"]
    );

    return key;
  };

  // Function to concatenate two Uint8Arrays
  const concatenateBuffers = (buffer1, buffer2) => {
    const combined = new Uint8Array(buffer1.length + buffer2.length);
    combined.set(buffer1);
    combined.set(buffer2, buffer1.length);
    return combined;
  };

  const handleCloseUpload = () => setShowUpload(false);
  const handleShowUpload = () => setShowUpload(true);

  const handleCloseDownload = () => setShowDownload(false);
  const handleShowDownload = () => setShowDownload(true);

  return (
    <div className="download-upload">
      <Row>
        <Col xs={12} md={6}>
          <div className="downup-card">
            <div className="ducards" onClick={handleShowUpload}>
              <div>
                <img alt="icon upload" src={u} />
              </div>
            </div>
            <div className="ducard-name">Upload</div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="downup-card">
            <div className="ducards" onClick={handleShowDownload}>
              <div>
                <img alt="icon upload" src={d} />
              </div>
            </div>
            <div className="ducard-name">Download</div>
          </div>
        </Col>
      </Row>
      {/* Upload Modal */}
      <Modal show={showUpload} onHide={handleCloseUpload} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input type="file" onChange={handleFileChange} />
            <button
              onClick={handleUploadClick}
              disabled={!file}
              style={{ border: "none", borderRadius: "10px" }}
            >
              Upload File
              <FontAwesomeIcon icon={faUpload} />
            </button>
          </form>
          {message && <p>{message}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpload}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Download Modal */}
      <Modal show={showDownload} onHide={handleCloseDownload} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Download File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DownloadTable />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleDownloadClick}> */}
          {/* <Button variant="secondary">Download</Button> */}
          {/* {fileUrl && (
            <a href={fileUrl} download>
              Click here to download the file
            </a>
          )} */}
          <Button variant="secondary" onClick={handleCloseDownload}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Terms and Condition Modal */}
      {/* Upload Modal */}
    </div>
  );
}

export default Ducards;
