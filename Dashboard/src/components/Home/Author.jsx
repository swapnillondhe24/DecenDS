import React from "react";
import Button from "react-bootstrap/Button";
import { Card, Row, Col } from "react-bootstrap";
import "./Home.css";
import bg3 from "../../images/bg3.png";
import ayushi from "../../images/ayushi.jpg";
import shivu from "../../images/shivu.jpg";
import sappu from "../../images/sappu.jpg";
import yashaaa from "../../images/yashaaa.jpg";

function Author() {
  return (
    <div className="author">
      <div className="author-cards">
        <div className="features-head">Our Authors</div>
        <div className="author-row container">
          <div className="card">
            <img
              src={ayushi}
              alt="author1"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
            />
            <div className="authorName">Ayushi Nandeshwar</div>
            <div className="authorinfo">Frontend Developer</div>
          </div>
          <div className="card">
            <img
              src={shivu}
              alt="author1"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
            />
            <div className="authorName">Shivyani Rathod</div>
            <div className="authorinfo">Designer and Frontend Developer</div>
          </div>
          <div className="card">
            <img
              src={sappu}
              alt="author1"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
            />
            <div className="authorName">Swapnil Londhe</div>
            <div className="authorinfo">Backend Developer</div>
          </div>
          <div className="card">
            <img
              src={yashaaa}
              alt="author1"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
            />
            <div className="authorName">Yash Deshmukh</div>
            <div className="authorinfo">Android Developer</div>
          </div>
          {/* <Row>
            <Col>
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row> */}
        </div>
      </div>
    </div>
  );
}

export default Author;
