import React from "react";

const Select = (props) => {
  const { onChange, orderBy } = props;

  return (
    <div className="form-control">
      <select
        id="fitler"
        name="fitler"
        className="select-input"
        onChange={onChange}
        value={orderBy}
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
};
export default Select;
