import React from "react";
import Button from "react-bootstrap/Button";
import { Card, Row, Col } from "react-bootstrap";
import "./Home.css";
import bg3 from "../../images/bg3.png";

function Author() {
  return (
    <div className="author">
      <img className="d-block w-100 image-jumbo" src={bg3} alt="First slide" />
      <div className="author-cards">
        <div className="features-head">Authors</div>
        <div className="author-row">
          <div
            className="card"
            style={{ backgroundColor: "#fff", height: "200px", width: "200px" }}
          >
            <img />
            <div>Name</div>
          </div>
          <div className="card">
            <img />
            <div>Name</div>
          </div>
          <div className="card">
            <img />
            <div>Name</div>
          </div>
          <div className="card">
            <img />
            <div>Name</div>
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
