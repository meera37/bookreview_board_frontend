import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#001f3f", color: "#fdf6e3", padding: "15px 0"}}>
      <Container className="text-center">
        &copy; {new Date().getFullYear()} BookReviewBoard. All Rights Reserved.
      </Container>
    </footer>
  );
};

export default Footer;


