import React from "react";
import footerImg from "../assets/footer.png";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <img src={footerImg} alt="Footer" className="footer-img" />
  </footer>
);

export default Footer;
