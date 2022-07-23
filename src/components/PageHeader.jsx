import React, { useState } from "react";
import Button from "./Button";
import Select from "./Select";

const PageHeader = (props) => {
  const { title, onClick, bookmarkText, onChange, sort } = props;

  return (
    <div className="page-header">
      <h1 className="title">{title}</h1>
      <div>
        {bookmarkText && (
          <Button onClick={onClick} bookmarkText={bookmarkText} />
        )}

        <Select onChange={onChange} sort={sort} />
      </div>
    </div>
  );
};
export default PageHeader;
