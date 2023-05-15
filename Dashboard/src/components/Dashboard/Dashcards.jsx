import React from "react";
import i1 from "../../images/i1.png";
import i2 from "../../images/i2.png";
import i3 from "../../images/i3.png";
import i4 from "../../images/i4.png";
import "./Dashboard.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dashcards(props) {
  return (
    <div className="dashcard-outer">
      <Row>
        <Col>
          <div className="dashcards">
            <div>
              <img src={i1} alt="icon1" />
            </div>
            <div className="count">{props.space_used}</div>
            <div className="dashcard-name">Data Being Stored</div>
          </div>
        </Col>
        <Col>
          <div className="dashcards">
            <div>
              <img src={i2} alt="icon1" />
            </div>
            <div className="count">{props.storage_rented}</div>
            <div className="dashcard-name">Storage Rented</div>
          </div>
        </Col>
        <Col>
          <div className="dashcards">
            <div>
              <img src={i3} alt="icon1" />
            </div>
            <div className="count">{props.data_uploaded}</div>
            <div className="dashcard-name">Bandwidth Uploaded</div>
          </div>
        </Col>
        <Col>
          <div className="dashcards">
            <div>
              <img src={i4} alt="icon1" />
            </div>
            <div className="count">{props.data_downloaded}</div>
            <div className="dashcard-name">Bandwidth Downloaded</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashcards;
