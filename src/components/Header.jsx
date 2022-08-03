import React, {useContext} from "react";
import logo from "../assests/images/logo.png";
import Search from "./icons/Search";
import { GlobalContext } from "../contexts/BookContext";

const Header = () => {
  const { setSearchValue, searchValue, setActivePage } = useContext(GlobalContext);

  const debounce = () => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        setSearchValue(...args);
        setActivePage("search")
      }, 500);
    };
  };
  const optimizedFn = debounce();
  return (
    <div className="header">
      <div className="container">
        <div className="logo" onClick={() => setActivePage("home")}>
          <img src={logo} alt="logo" />
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search all news"
            onChange={(e) => optimizedFn(e.target.value)}
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
