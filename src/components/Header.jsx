import React from "react";
import logo from "../assests/images/logo.png";
import Search from "./icons/Search";
import Button from "./Button";
import PageHeader from "./PageHeader";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search all news" />
          <div>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
