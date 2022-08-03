import React, { useContext } from "react";
import { GlobalContext } from "../contexts/BookContext";

const CardNew = (props) => {
  const { item } = props;
  const { setArticalId, articalId, setActivePage } = useContext(GlobalContext);

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
  const handelArtical = (id) => {
    setActivePage("artical");
    setArticalId(id);
  };
  return (
    <div className="card-new-text" onClick={() => handelArtical(item.id)}>
      <div className="card-info">
        <h3 className="title">{item.webTitle}</h3>
      </div>
      <SwitchCase value={item.sectionId} />
    </div>
  );
};
export default CardNew;
