import React from "react";
import "./HostANode.css";
import Header from "../Header";

function HostANode() {
  return (
    <div className="host-a-node">
      <Header />
      <div className="host-a-node-bar">Peer ID : </div>
      <div className="tandc">
        <div className="tandc-content">
          <h4>Terms and Conditions</h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, natus
          quisquam provident dolorem nulla ab exercitationem sapiente sequi
          obcaecati deserunt voluptas, labore tempore. A facilis ducimus,
          dignissimos id sunt obcaecati.
        </div>

        <div className="tandc-details">
          For more details read Documentation and Installation guide
        </div>
      </div>
    </div>
  );
}

export default HostANode;
