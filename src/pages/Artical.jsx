import React, { useState, useContext, useEffect } from "react";
import { getArtical } from "../api/artical.api";
import Button from "../components/Button";
import Snackbar from "../components/Snackbar";
import Loading from "../components/Loading";

import { GlobalContext } from "../contexts/BookContext";

const Artical = () => {
  const [articalData, setArticalData] = useState();
  const [isInBookList, setIsInBookList] = useState(false);
  const [bookmarkText, setBookmarkText] = useState("add bookmark");
  const [showSnack, setShowSnack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeSnack, setTypeSnack] = useState();
  const {
    articalId,
    bookMarkList,
    addArticleToBookList,
    removeArticleFromBookList,
  } = useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      await getArtical({
        articalID: articalId,
      })
        .then((value) => {
          setArticalData(value.data.response.results[0]);
          setLoading(false);

          if (bookMarkList.find((artical) => artical.id === articalId)) {
            setIsInBookList(true);
            setBookmarkText("remove bookmark");
          } else {
            setIsInBookList(false);
            setBookmarkText("add bookmark");
          }
        })
        .catch(() => ({
          errorMessage: "Something went wrong",
        }));
    })();
  }, []);
  const handleBookmarkList = () => {
    if (isInBookList) {
      removeArticleFromBookList(articalData.id);
      setBookmarkText("add bookmark");
      setIsInBookList(false);
      setTypeSnack("fail");
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 1000);
    } else {
      addArticleToBookList(articalData);
      setBookmarkText("remove bookmark");
      setIsInBookList(true);
      setShowSnack(true);
      setTypeSnack("success");
      setTimeout(() => {
        setShowSnack(false);
      }, 1000);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="artical-section">
          <Button onClick={handleBookmarkList} bookmarkText={bookmarkText} />
          <span className="date"> {articalData?.webPublicationDate}</span>
          <h1>{articalData?.webTitle}</h1>
          <h2>{articalData?.fields.headline}</h2>
          <div className="artical-body">
            <div
              className={articalData?.fields.thumbnail ? "width55" : null}
              dangerouslySetInnerHTML={{ __html: articalData?.fields.body }}
            />
            {articalData?.fields.thumbnail && (
              <div
                className="artical-media"
                style={articalData?.fields.thumbnail ? null : null}
              >
                <img src={articalData?.fields.thumbnail} alt="" />
              </div>
            )}
          </div>
          <Snackbar showSnack={showSnack} typeSnack={typeSnack} />
        </div>
      )}
    </div>
  );
};
export default Artical;
