import React from "react";
import Header from "../Header";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button, Row, Col, Tab, Tabs } from "react-bootstrap";
import c1 from "../../images/c1.png";
import About from "./About";
import Features from "./Features";
import Author from "./Author";

function Home() {
  return (
    <div className="Home">
      <Header />

      <div className="jumbo">
        <img className="d-block w-100 image-jumbo" src={c1} alt="First slide" />
        <Link to="/signup" className="regLink">
          <Button className="btn">Sign Up</Button>
        </Link>
      </div>

      <Features />
      <About />
      <Author />
    </div>
  );
}

export default Home;
