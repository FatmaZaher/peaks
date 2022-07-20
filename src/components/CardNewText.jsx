import React from "react";

const CardNew = (props) => {
    const {cardInfo} = props;
  return (
    <div className="card-new-text">
      <div className="card-info">
        <h3 className="title">
          {cardInfo.title}
        </h3>
      </div>
    </div>
  );
};
export default CardNew;
