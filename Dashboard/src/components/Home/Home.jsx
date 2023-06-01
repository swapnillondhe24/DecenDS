import React, { useState, useEffect } from "react";
import Header from "../Header";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button, Row, Col, Tab, Tabs } from "react-bootstrap";
import c1 from "../../images/c1.png";
import About from "./About";
import Features from "./Features";
import Author from "./Author";

function Home() {
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
    <div className="Home">
      <Header peerId={data?.peerId} coins_earned={data?.coins_earned} />

      <div className="jumbo">
        <img className="d-block w-100 image-jumbo" src={c1} alt="First slide" />
      </div>

      <Features />
      <About />
      <Author />
    </div>
  );
}

export default Home;
