import React, { useEffect, useState } from "react";
import Header from "../Header";
import "./Dashboard.css";
import Ducards from "./Ducards";
import Dashcards from "./Dashcards";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dashboard() {
  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  if (!token) {
    // Redirect to login if the user is not authenticated
    window.location.href = "/signin";
    return null;
  }
  const requestOptions = {
    method: "POST",
    headers: { Authorization: `${token}` },
  };

  return (
    <div className="dashboard">
      <Header peerId={data?.peerId} coins_earned={data?.coins_earned} />
      <div className="dashboard-bar">Dashboard</div>
      <div className="dashboard-cards">
        <Dashcards
          data_uploaded={data?.data_uploaded}
          data_downloaded={data?.data_downloaded}
          space_used={data?.space_used}
          storage_rented={data?.storage_rented}
        />
      </div>
      <div className="downup">
        <Ducards />
      </div>
    </div>
  );
}

export default Dashboard;
