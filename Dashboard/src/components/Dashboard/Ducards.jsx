import React, { useState } from "react";
import "./Dashboard.css";
import u from "../../images/u.png";
import d from "../../images/d.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DownloadTable from "./DownloadTable";
import axios from "axios";

function Ducards() {
  const [showUpload, setShowUpload] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const [file, setFile] = useState();

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
      {/* Download Modal */}
      <Modal show={showDownload} onHide={handleCloseDownload} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Download File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DownloadTable />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Download</Button>
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
