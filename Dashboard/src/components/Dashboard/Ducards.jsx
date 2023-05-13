import React, { useState } from "react";
import "./Dashboard.css";
import u from "../../images/u.png";
import d from "../../images/d.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DownloadTable from "./DownloadTable";

function Ducards() {
  const [showUpload, setShowUpload] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");

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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    try {
      const response = await fetch("https://mereor.serveo.net/upload_file", {
        method: "POST",
        body: formData,
        headers: { Authorization: `${token}` },
      });
      console.log(formData);
      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  // const handleUploadClick = () => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   fetch("https://5b7a-202-71-157-235.ngrok-free.app/upload_file", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `${token}`,
  //     },
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .catch((error) => console.error(error));
  // };

  const handleCloseUpload = () => setShowUpload(false);
  const handleShowUpload = () => setShowUpload(true);

  const handleCloseDownload = () => setShowDownload(false);
  const handleShowDownload = () => setShowDownload(true);

  return (
    <div className="download-upload">
      <Row>
        <Col>
          <div className="downup-card">
            <div className="ducards" onClick={handleShowUpload}>
              <div>
                <img alt="icon upload" src={u} />
              </div>
            </div>
            <div className="ducard-name">Upload</div>
          </div>
        </Col>
        <Col>
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
            <button onClick={handleUploadClick} disabled={!file}>
              Upload File
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
          <Button variant="secondary">Download</Button>
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
