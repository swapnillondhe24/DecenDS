import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

function DownloadTable() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://mereor.serveo.net/get_file_listt", {
      method: "POST",
      headers: { Authorization: `${token}` },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }
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
      {console.log(data)}
      <div>{data._id}</div>
      {/* {links.map((link, index) => (
        <div key={index._id}>
          <a href={link}>{link}</a>
        </div>
      ))} */}
      {/* <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>File Size</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {downloadArray.map((data) => {
            return (
              <tr>
                <td>{data.fname}</td>
                <td>{data.fsize}</td>
                <td>{data.select}</td>
              </tr>
            );
          })}
        </tbody>
      </Table> */}
    </div>
  );
}

export default DownloadTable;
