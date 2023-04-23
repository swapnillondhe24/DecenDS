import React from "react";
import "./HostANode.css";
import Header from "../Header";
import note from "../../images/note.png";
import { Link } from "react-router-dom";

function HostANode() {
  return (
    <div className="host-a-node">
      <Header />
      <div className="host-a-node-bar">
        <img src={note} alt="Peer ID " />
        Peer ID : 123456789uugftvvv555{" "}
      </div>
      <div className="tandc">
        <div className="tandc-content">
          <h4>Terms and Conditions</h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, natus
          quisquam provident dolorem nulla ab exercitationem sapiente sequi
          obcaecati deserunt voluptas, labore tempore. A facilis ducimus,
          dignissimos id sunt obcaecati. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eius, natus quisquam provident dolorem nulla ab
          exercitationem sapiente sequi obcaecati deserunt voluptas, labore
          tempore. A facilis ducimus, dignissimos id sunt obcaecati. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Eius, natus quisquam
          provident dolorem nulla ab exercitationem sapiente sequi obcaecati
          deserunt voluptas, labore tempore. A facilis ducimus, dignissimos id
          sunt obcaecati. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Eius, natus quisquam provident dolorem nulla ab exercitationem
          sapiente sequi obcaecati deserunt voluptas, labore tempore. A facilis
          ducimus, dignissimos id sunt obcaecati. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eius, natus quisquam provident dolorem
          nulla ab exercitationem sapiente sequi obcaecati deserunt voluptas,
          labore tempore. A facilis ducimus, dignissimos id sunt obcaecati.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, natus
          quisquam provident dolorem nulla ab exercitationem sapiente sequi
          obcaecati deserunt voluptas, labore tempore. A facilis ducimus,
          dignissimos id sunt obcaecati.
        </div>
        <input
          type="checkbox"
          class="tandc-checkbox"
          name="tandc"
          value="tandc"
        />
        <label for="vehicle1"> I have read all the Terms and Conditions</label>
      </div>
      <div className="tandc-details">
        <Link
          to="/documentation"
          style={{ color: "#0D0C0C", cursor: "pointer" }}
        >
          For more details read Documentation and Installation guide
        </Link>
      </div>
      <div className="extraspace"></div>
    </div>
  );
}

export default HostANode;
