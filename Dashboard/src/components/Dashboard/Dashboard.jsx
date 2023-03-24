import React from "react";
import Header from "../Header";
import "./Dashboard.css";
import Ducards from "./Ducards";
import Dashcards from "./Dashcards";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-bar">Dashboard</div>
      <div className="dashboard-cards">
        <Dashcards />
      </div>
      <div className="downup">
        <Ducards />
      </div>
    </div>
  );
}

export default Dashboard;
