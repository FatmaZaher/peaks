import React from "react";
import logo from "../assests/images/logo.png";
import Search from "./icons/Search";

const Header = (props) => {
  const { onClick, onChange } = props;
  return (
    <div className="header">
      <div className="container">
        <div className="logo" onClick={onClick}>
          <img src={logo} alt="logo" />
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search all news"
            onChange={onChange}
          />
          <div>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
