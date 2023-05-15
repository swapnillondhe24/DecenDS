import React, { useState } from "react";
import "./HostANode.css";
import Header from "../Header";
import note from "../../images/note.png";
import { Link } from "react-router-dom";
import TermsAndCondition from "./TermsAndCondition";

function HostANode() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="host-a-node">
      <Header />
      <div className="host-a-node-bar">
        <img src={note} alt="Peer ID " />
        Peer ID : 123456789uugftvvv555{" "}
      </div>
      <div className="tandc">
        <div className="tandc-content">
          <TermsAndCondition />
        </div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
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
