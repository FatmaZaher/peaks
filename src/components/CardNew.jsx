import React from "react";
import logo from "../assests/images/logo.png";

const CardNew = (props) => {
  const { item, index, showBody, onClick } = props;
  const card = {
    backgroundImage: `url(${item.fields.thumbnail})`,
  };
  const peaksBack = {
    backgroundColor: "#0D47A1",
  };
  function SwitchCase(props) {
    switch (props.value) {
      case "sport":
        return <div className="red sectionColor"></div>;

      case "culture":
        return <div className="yallow sectionColor"></div>;

      case "lifestyle":
        return <div className="blue sectionColor"></div>;

      default:
        return <div className="sectionColor"></div>;
    }
  }
  return (
    <div
      className="card-new"
      style={item.fields.thumbnail ? card : peaksBack}
      index={index}
      onClick={onClick}
    >
      {!item.fields.thumbnail && (
        <div className="peaksBack">
          <img src={logo} alt={item.fields.headline} />
        </div>
      )}
      <div className="card-new-info">
        <h3 className="title">{item.webTitle}</h3>
        {showBody && <p>{item.fields.headline}</p>}
      </div>
      <SwitchCase value={item.sectionId} /> 
    </div>
  );
};
export default CardNew;
