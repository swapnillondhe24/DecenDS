import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
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
          <Container>
            <Row>
              <Col xs={12} md={6} lg={3}>
                <div className="card mx-auto">
                  <img src={ayushi} alt="author1" className="author-image" />
                  <div className="authorName">Ayushi Nandeshwar</div>
                  <div className="authorinfo">Frontend Developer</div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={3}>
                <div className="card mx-auto">
                  <img src={shivu} alt="author1" className="author-image" />
                  <div className="authorName">Shivyani Rathod</div>
                  <div className="authorinfo">Figma Designer </div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={3}>
                <div className="card mx-auto">
                  <img src={sappu} alt="author1" className="author-image" />
                  <div className="authorName">Swapnil Londhe</div>
                  <div className="authorinfo">Backend Developer</div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={3}>
                <div className="card mx-auto">
                  <img src={yashaaa} alt="author1" className="author-image" />
                  <div className="authorName">Yash Deshmukh</div>
                  <div className="authorinfo">Android Developer</div>
                </div>
              </Col>
            </Row>
          </Container>

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
