import React, { useState, useContext, useEffect } from "react";
import CardNew from "../components/CardNew";
import PageHeader from "../components/PageHeader";
import { GlobalContext } from "../contexts/BookContext";
import { getHomeNews } from "../api/home.api";
import Loading from "../components/Loading";

const Search = () => {
  const [orderBy, setorderBy] = useState("newest");
  const { searchValue, setActivePage } = useContext(GlobalContext);
  const [isFetching, setIsFetching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handelChange = (e) => {
    setorderBy(e.target.value);
  };
  const isScrolling = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setIsFetching(true);
    }
  };
  useEffect(() => {
    if (searchValue) {
      (async () => {
        await getHomeNews({
          section: ["news", "sport", "culture", "life", "style"],
          pageSize: 15,
          orderBy: orderBy,
          page,
          searchValue: searchValue,
        })
          .then((res) => {
            setSuggestions(res.data.response.results);
            setLoading(false);
          })
          .catch(() => ({
            errorMessage: "Something went wrong",
          }));
      })();
    } else {
      setActivePage("home");
    }

    window.addEventListener("scroll", isScrolling);
  }, [searchValue, orderBy]);

  useEffect(() => {
    if (isFetching) {
      setPage(page + 1);
      (async () => {
        await getHomeNews({
          section: ["news", "sport", "culture", "life", "style"],
          pageSize: 15,
          orderBy: orderBy,
          page,
          searchValue: searchValue,
        })
          .then((res) => {
            setSuggestions([...suggestions, ...res.data.response.results]);
            setIsFetching(false);
          })
          .catch(() => ({
            errorMessage: "Something went wrong",
          }));
      })();
    }
  }, [isFetching]);
  return (
    <div className="search-section">
      <PageHeader
        title="Search Result"
        onChange={handelChange}
        orderBy={orderBy}
        bookmarkText="view bookmark"
        onClick={() => (setActivePage("bookmark"), setSuggestions([]))}
      />
      {loading ? (
        <Loading />
      ) : (
        <section className="grid_wrap">
          <div className="grid">
            {suggestions.map((item, index) => (
              <CardNew item={item} key={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
export default Search;
