// import { ErrorMessage, Field } from "formik";
import React from "react";

const Select = (props) => {
  const options = [
    { id: 1, name: "Newest first" },
    { id: 2, name: "Oldest first" },
    { id: 3, name: "Most popular" },
  ];
  return (
    <div className="form-control">
      <select id="fitler" name="fitler" className="select-input">
        {options.map((option) => {
          return <option value={option.id}>{option.name}</option>;
        })}
      </select>
    </div>
  );
};
export default Select;
