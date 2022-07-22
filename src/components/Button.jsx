import React from "react";
import { useState } from "react";
import Bookmark from "./icons/Bookmark";

const Button = (props) => {
  const {onClick, bookmarkText} = props;

  return (
    <button type-="button" className="btn" onClick={onClick}>
      <Bookmark />
      <span>{bookmarkText}</span>
    </button>
  );
};
export default Button;
