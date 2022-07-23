import React from "react";
import Button from "./Button";

const Artical = (props) => {
  const { articalData, onClick, bookmarkText } = props;
  const width49 = {
    width: '49%',
  };
  return (
    <div className="artical-section">
      <div className="artical-content">
        <Button onClick={onClick} bookmarkText={bookmarkText} />
        <span> {articalData.webPublicationDate}</span>
        <h1>{articalData.webTitle}</h1>
        <h2>{articalData.fields.headline}</h2>
        <div className="artical-body">
          <div
            // style={articalData.fields.thumbnail ? width49 : null}
            dangerouslySetInnerHTML={{ __html: articalData.fields.body }}
          />
          {/* {articalData.fields.thumbnail && (
            <div
              className="artical-media"
              style={articalData.fields.thumbnail ? width49 : null}
            >
              <img src={articalData.fields.thumbnail} alt="" />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
export default Artical;
