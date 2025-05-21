import React from "react";
import logo from "../assets/LOGO_CULTURA.png";
import "./Header.css";

const Header = () => (
  <header className="header">
    <img src={logo} alt="Cultura Logo" className="logo" />
    <h1 className="title">Mis Museos Jalisco</h1>
  </header>
);

export default Header; 