import React, { useState, useEffect } from "react";
import "./HostANode.css";
import Header from "../Header";
import note from "../../images/note.png";
import { Link } from "react-router-dom";
import TermsAndCondition from "./TermsAndCondition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
// import { faCoinVertical } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";

function HostANode() {
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  const requestOptions = {
    method: "POST",
    headers: { Authorization: `${token}` },
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="host-a-node">
      <Header />
      <div className="container host-a-node-bar" style={{ display: "flex" }}>
        <div className="host-a-node-bar-content" style={{ width: "50%" }}>
          <FontAwesomeIcon icon={faNoteSticky} size="2xl" />
          <span style={{ marginLeft: "10px" }}>Peer ID : {data?.peerId}</span>
        </div>
        <div className="host-a-node-bar-content" style={{ width: "50%" }}>
          <FontAwesomeIcon icon={faNoteSticky} size="2xl" />

          <span>Coins Earned : {data?.coins_earned}</span>
        </div>
      </div>

      <div className="tandc">
        <div className="tandc-content">
          <TermsAndCondition />
        </div>
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
