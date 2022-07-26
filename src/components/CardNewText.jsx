import React from "react";

const CardNew = (props) => {
  const { item, index, onClick } = props;
  function SwitchCase(props) {
    switch (props.value) {
      case "sports":
        return <div className="red sectionColor">red</div>;

      case "culture":
        return <div className="yallow sectionColor">yallow</div>;

      case "lifestyle":
        return <div className="blue sectionColor">blue</div>;

      default:
        return <div className="red sectionColor"></div>;
    }
  }
  return (
    <div className="card-new-text" index={index} onClick={onClick}>
      <div className="card-info">
        <h3 className="title">{item.webTitle}</h3>
      </div>
     <SwitchCase value={item.sectionId} /> 
    </div>
  );
};
export default CardNew;
