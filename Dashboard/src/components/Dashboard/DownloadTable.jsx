import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function DownloadTable() {
  let loadingGif = require("../../images/loading.gif");
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://127.0.0.1:5000/get_file_list",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  const requestOptions = {
    method: "POST",
    headers: { Authorization: `${token}` },
  };

  const handleDownload = (itemId) => {
    const item = data.find((item) => item.cid === itemId);
    if (item) {
      console.log(item.cid);
      const downloadUrl = `http://${item.cid}.ipfs.w3s.link`;
      window.open(downloadUrl, "_blank");
    }
  };

  // if (!data) {
  //   return <div>Loading...</div>;
  // }
  // const [links, setLinks] = useState([]);
  // const token = localStorage.getItem("token");

  // useEffect(() => {
  //   fetch("https://1a11-152-58-19-225.ngrok-free.app/get_file_list", {
  //     method: "POST",
  //     headers: { Authorization: `${token}` },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLinks(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div>
      {loading ? (
        <img src={loadingGif} alt="Loading" />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <Row style={{ marginBottom: "10px", display: "flex" }}>
                  <Col lg="10">
                    <td>{item.name}</td>
                  </Col>

                  <Col lg="2" className="d-flex justify-content-end">
                    <button
                      onClick={() => handleDownload(item.cid)}
                      className="download_file_btn"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </button>
                  </Col>
                </Row>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DownloadTable;
