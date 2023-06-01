import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import start from "../../images/Start Splash Screen.png";
import start1 from "../../images/Start 1.png";
import start2 from "../../images/Start 2.png";
import start3 from "../../images/Start 3.png";
import start4 from "../../images/Start 4.png";
import start5a from "../../images/Start 5(a).png";
import start5b from "../../images/Start 5(b).png";
import start6 from "../../images/Start 6.png";
import "./Documentation.css";
function ImageCarousel() {
  return (
    <div className="ImageCarousel">
      <Row>
        <Col lg={3}>
          <img src={start2} alt="login screen" className="setup-image" />
        </Col>
        <Col lg={9}>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            fuga atque dolore doloremque cum odio in error corrupti eligendi
            quia praesentium dicta veniam perspiciatis culpa, a totam facere
            rem. Ipsum?
          </span>
        </Col>
      </Row>
    </div>
  );
}

export default ImageCarousel;
