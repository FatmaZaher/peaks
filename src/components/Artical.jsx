import React from "react";
import Button from "./Button";

const Artical = (props) => {
  const { articalData, onClick, bookmarkText } = props;
  const width55 = {
    width: "55%",
  };
  return (
    <div className="artical-section">
      <Button onClick={onClick} bookmarkText={bookmarkText} />
      <span className="date"> {articalData.webPublicationDate}</span>
      <h1>{articalData.webTitle}</h1>
      <h2>{articalData.fields.headline}</h2>
      <div className="artical-body">
        <div
          style={articalData.fields.thumbnail ? width55 : null}
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
    </div>
  );
};
export default Artical;
