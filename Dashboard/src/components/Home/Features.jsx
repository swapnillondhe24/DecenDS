import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button, Row, Col, Tab, Tabs } from "react-bootstrap";
import f1 from "../../images/decen.jpg";
import f2 from "../../images/secure.jpg";
import f3 from "../../images/cost.jpg";

function Features() {
  return (
    <div className="container features">
      <div className="features-head">Our Features</div>
      <Container>
        <Row>
          <Col sm={12} lg={4} md={12}>
            <div className="features-card">
              <img src={f1} alt="fimage" className="fimage" />
              <div className="features-text"> Decentralized Storage</div>
            </div>
          </Col>
          <Col sm={12} lg={4} md={12}>
            <div className="features-card">
              <img src={f2} alt="fimage" className="fimage" />
              <div className="features-text">Highly Secure</div>
            </div>
          </Col>
          <Col sm={12} lg={4} md={12}>
            <div className="features-card">
              <img src={f3} alt="fimage" className="fimage" />
              <div className="features-text"> Cost Efficient</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Features;
