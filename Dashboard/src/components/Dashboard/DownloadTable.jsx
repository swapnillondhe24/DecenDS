import React from "react";
import Table from "react-bootstrap/Table";

const downloadArray = [
  {
    fname: "abc.png",
    fsize: "234kb",
    select: "link1",
  },
  {
    fname: "xyz.png",
    fsize: "690kb",
    select: "link1",
  },
  {
    fname: "uvw.png",
    fsize: "560kb",
    select: "link1",
  },
];

function DownloadTable() {
  return (
    <div>
      <Table striped bordered hover>
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
      </Table>
    </div>
  );
}

export default DownloadTable;
