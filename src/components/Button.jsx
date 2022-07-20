import React from "react";
import { useState } from "react";
import Bookmark from "./icons/Bookmark";

const Button = () => {
  const [bookmark, setBookmark] = useState("add bookmark");

  return (
    <button type-="button" className="btn">
      <Bookmark />
      <span>{bookmark}</span>
    </button>
  );
};
export default Button;
