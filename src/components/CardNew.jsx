import React from "react";
import pic from "../assests/images/pic.png";

const CardNew = (props) => {
    const {cardInfo} = props;
  return (
    <div className="card-new" style={{ backgroundImage: `url(${pic})` }}>
      <div className="card-new-info">
        <h3 className="title">
          {cardInfo.title}
        </h3>
        {cardInfo.body && (
          <p>
            {cardInfo.body}
          </p>
        )}
      </div>
    </div>
  );
};
export default CardNew;
