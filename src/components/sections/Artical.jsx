import React from "react";
import Button from "../Button";
import Snackbar from "../Snackbar";

const Artical = (props) => {
  const { articalData, onClick, bookmarkText, showSnack, typeSnack } = props;
  return (
    <div className="artical-section">
      <Button onClick={onClick} bookmarkText={bookmarkText} />
      <span className="date"> {articalData.webPublicationDate}</span>
      <h1>{articalData.webTitle}</h1>
      <h2>{articalData.fields.headline}</h2>
      <div className="artical-body">
        <div
          className={articalData.fields.thumbnail ? "width55" : null}
          dangerouslySetInnerHTML={{ __html: articalData.fields.body }}
        />
        {articalData.fields.thumbnail && (
          <div
            className="artical-media"
            style={articalData.fields.thumbnail ? null : null}
          >
            <img src={articalData.fields.thumbnail} alt="" />
          </div>
        )}
      </div>
      <Snackbar showSnack={showSnack} typeSnack={typeSnack} />
    </div>
  );
};
export default Artical;
