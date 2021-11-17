import React from "react";
import Facebook from "./images/facebook.png";
import Instagram from "./images/instagram.png";
import LinkedIn from "./images/linkedin.png";
import Twitter from "./images/twitter.png";
// import "./Footer.css";
import { Container, Row, Col, Nav } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container>
        <Row className="align-items-baseline">
          <Col className="text-center py-3 d-flex">
            &copy;2021 BizMade All right reserved
          </Col>
          <Col className="social-links" style={{ display: "contents" }}>
            <Nav className="ml-auto">
              <Nav.Link>
                <i class="fab fa-facebook-square"></i>
              </Nav.Link>
              <Nav.Link>
                <i class="fab fa-instagram-square"></i>
              </Nav.Link>
              <Nav.Link>
                <i class="fab fa-linkedin"></i>
              </Nav.Link>
              <Nav.Link>
                <i class="fab fa-twitter-square"></i>
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
