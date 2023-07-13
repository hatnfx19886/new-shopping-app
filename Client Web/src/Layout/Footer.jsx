import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container fluid="md">
        <Row>
          <Col>
            <h4>customer services</h4>
            <Link to="#">Help & Contact Us</Link>
            <Link to="#">Returns & Refunds</Link>
            <Link to="#">Online Stores</Link>
            <Link to="#">Term & Conditions</Link>
          </Col>
          <Col>
            <h4>company</h4>
            <Link to="#">What We Do</Link>
            <Link to="#">Available Services</Link>
            <Link to="#">Latest Posts</Link>
            <Link to="#">FAQs</Link>
          </Col>
          <Col>
            <h4>social media</h4>
            <Link to="#">Twitter</Link>
            <Link to="#">Instagram</Link>
            <Link to="#">Facebook</Link>
            <Link to="#">Pinterest</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
