import React, { useState } from "react";
import Button from "./Button";
import Select from "./Select";

const PageHeader = (props) => {
  const { title } = props;

  return (
    <div className="page-header">
      <h1 className="title">{title}</h1>
      <div>
        <Button />
        <Select />
      </div>
      
    </div>
  );
};
export default PageHeader;
