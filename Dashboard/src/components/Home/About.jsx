import React, { useEffect, useRef } from "react";
import "./Home.css";
import { Row, Col } from "react-bootstrap";
import vid from "../../images/about.mp4";
import about from "../../images/about.png";

function About() {
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <div className="About ">
      <div className="about-head" style={{ marginBottom: "0" }}>
        About Us <img src={about} alt="about-us-col" />
      </div>
      <Row>
        <Col lg={4} md={6} sm={12}>
          <div className="about-inner">
            <video
              style={{ width: "300px", margin: "0 auto" }}
              playsInline
              loop
              muted
              alt="All the devices"
              src={vid}
              ref={videoEl}
            />
          </div>
        </Col>
        <Col lg={8} md={6} sm={12}>
          <div className="about-inner">
            <div className="about-body ">
              Developed an Decentralized Data Storage System for user to
              overcome all the current limitations of an centralized system such
              as Trustlessness, DDoS Attacks, Higher cost of renting etc.
              Provide Android users an option of passive income by renting out
              their un-utilized space to system and earn extra income. With rise
              of global cyber attacks and cost of cloud storages, there is need
              for relevant platform where user can store important files in
              trustless system and at lower cost. Therefore, developed an
              application that best compliments traditional storage methods
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default About;
