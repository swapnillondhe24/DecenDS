import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button, Row, Col, Tab, Tabs } from "react-bootstrap";

function Features() {
  return (
    <div className="container features">
      <div className="features-head">Features</div>
      <Row>
        <Col>
          <div className="features-card">Decentralized Storage</div>
        </Col>
        <Col>
          <div className="features-card">Highly Secure</div>
        </Col>
        <Col>
          <div className="features-card">Cost Efficient</div>
        </Col>
      </Row>
    </div>
  );
}

export default Features;
