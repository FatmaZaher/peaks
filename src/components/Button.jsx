import React from "react";
import Bookmark from "./icons/Bookmark";
import PropTypes from 'prop-types';


const Button = (props) => {
  const {onClick, bookmarkText} = props;

  return (
    <button type-="button" className="btn" onClick={onClick}>
      <Bookmark />
      <span>{bookmarkText}</span>
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func,
  bookmarkText: PropTypes.string
}
export default Button;
