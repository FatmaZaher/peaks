import React from "react";
import Button from "../Button";
import Select from "../Select";
import PropTypes from 'prop-types';


const PageHeader = (props) => {
  const { title, onClick, bookmarkText, onChange, orderBy } = props;

  return (
    <div className="page-header">
      <h1 className="title">{title}</h1>
      <div>
        {bookmarkText && (
          <Button onClick={onClick} bookmarkText={bookmarkText} />
        )}

        <Select onChange={onChange} orderBy={orderBy} />
      </div>
    </div>
  );
};
PageHeader.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  bookmarkText: PropTypes.string,
  onChange: PropTypes.func,
  orderBy: PropTypes.string,

}
export default PageHeader;
