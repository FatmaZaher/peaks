import React from "react";

const CardNew = (props) => {
  const { item, index, hideBody , onClick} = props;
  const card = {
    backgroundImage: `url(${item.fields.thumbnail})`,
  };
  return (
    <div
      className={`${item.fields.thumbnail ? "card-new" : "card-new-text"}`}
      style={item.fields.thumbnail ? card : null}
      index = {index}
      onClick = {onClick}
    >
      <div className="card-new-info">
        <h3 className="title">{item.webTitle}</h3>
        {item.fields.body && <p className={`${hideBody ? "hide-body" : null}`}>{item.fields.body}</p>}
      </div>
    </div>
  );
};
export default CardNew;
