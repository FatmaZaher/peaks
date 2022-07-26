import React from "react";
import Bookmark from "./icons/Bookmark";

const Snackbar = (props) => {
  const { showSnack, typeSnack } = props;
  return (
    <div
      className={`snackbar ${showSnack ? "show" : "hide"}`}
      style={{
        backgroundColor: typeSnack == "success" ? "#388E3C " : "#D32F2F",
      }}
    >
      {typeSnack == "success" ? (
        <span>
          <Bookmark /> Added To Bookmark
        </span>
      ) : (
        <span className="fail">
          <Bookmark /> Removed From Bookmark
        </span>
      )}
    </div>
  );
};
export default Snackbar;
