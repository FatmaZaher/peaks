import React, { useContext } from "react";
import logo from "../../assests/images/logo.png";
import { GlobalContext } from "../../contexts/BookContext";
import PropTypes from 'prop-types';

const CardNew = (props) => {
  const { item, showBody } = props;
  const { setArticalId, articalId , setActivePage} = useContext(GlobalContext);

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
  const handelArtical = (id) => {
    setActivePage("artical")
    setArticalId(id);
  };
  return (
    <div
      className="card-new"
      style={item.fields.thumbnail ? card : peaksBack}
      onClick={() => handelArtical(item.id)}
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
CardNew.propTypes = {
  item: PropTypes.object,
  showBody: PropTypes.bool,

}
export default CardNew;
