import React, { useState, useContext, useEffect } from "react";
import CardNew from "../components/CardNew";
import PageHeader from "../components/PageHeader";
import { GlobalContext } from "../contexts/BookContext";
import Loading from "../components/Loading";
const Bookmark = () => {
  const [orderBy, setorderBy] = useState("newest");
  const { bookMarkList } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  const handelChange = (e) => {
    setorderBy(e.target.value);
  };
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <div className="bookmark-section">
      <PageHeader
        title="All Bookmark"
        onChange={handelChange}
        orderBy={orderBy}
      />
      {loading ? (
        <Loading />
      ) : (
        <section className="grid_wrap">
          <div className="grid">
            {bookMarkList.map((item, index) => (
              <CardNew item={item} key={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
export default Bookmark;
