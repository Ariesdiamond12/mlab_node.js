import React from "react";
import "./Navbar.css";
import search_icon from "../../assets/search-w.png";

const NavbarComponent = ({ handleSearch }) => {
  return (
    <div className="navbar">
      <ul>
        <li>Employee Registration App</li>
      </ul>
      <div className="search_box">
        <input type="text" placeholder="Search" onChange={handleSearch} />
        <img src={search_icon} alt="" />
      </div>
    </div>
  );
};

export default NavbarComponent;
