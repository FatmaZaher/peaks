import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import Header from "../components/Header";
import CardNew from "../components/CardNew";
import CardNewText from "../components/CardNewText";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import Artical from "../components/sections/Artical";
import { GlobalContext } from "../contexts/BookContext";
import Footer from "../components/Footer";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [sportData, setSportData] = useState([]);
  const [cultureData, setCultureData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setsort] = useState("newest");
  const [articalData, setArticalData] = useState();
  const [bookmarkText, setBookmarkText] = useState("add bookmark");
  const [isInBookList, setIsInBookList] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [typeSnack, setTypeSnack] = useState();
  const { bookMarkList, addArticleToBookList, removeArticleFromBookList } =
    useContext(GlobalContext);
  const [suggestions, setSuggestions] = useState("");
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [valueSearch, setValueSearch] = useState("");

  const [theSection, setTheSection] = useState("topStories");

  const API_URL = "https://content.guardianapis.com";
  const API_KEY = "7b979b22-ab7e-4d58-b00a-8c747f8fc795";

  const handelArtical = async (item) => {
    setLoading(true);
    const responseArticalData = await axios.get(
      `${API_URL}/search?ids=${item}&api-key=${API_KEY}&show-fields=all`
    );

    const articleFind = () => {
      if (bookMarkList.find((artical) => artical.id === item)) {
        setIsInBookList(true);
        setBookmarkText("remove bookmark");
      } else {
        setIsInBookList(false);
        setBookmarkText("add bookmark");
      }
    };
    articleFind();
    setArticalData(responseArticalData.data.response.results[0]);
    setTheSection("artical");
    setSuggestions([]);
    setLoading(false);
  };
  const handelChange = (e) => {
    setsort(e.target.value);
  };
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

  const debounce = (func) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);

      }, 500);
    };
  };
  const isScrolling = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setIsFetching(true);
    }
  };

  const handleSearch = async (value) => {

    if (!isFetching) {
      setLoading(true);
    } else {
      setPage(page + 1);
      setIsFetching(false);
    }
    const responseSearchData = await axios.get(
      `${API_URL}/search?page-size=15&q=${value}&page=${page}&api-key=${API_KEY}&show-fields=all`
    );
    setSuggestions([
      ...suggestions,
      ...responseSearchData.data.response.results,
    ]);
    setValueSearch(value);
    if (!isFetching) {
      setLoading(false);
    }
    if (value) {
      setTheSection("search");
    } else {
      setTheSection("topStories");
      setSuggestions([]);
    }
    window.addEventListener("scroll", isScrolling);
  };

  const optimizedFn = useCallback(debounce(handleSearch), []);

  const HandleCard = (props) => {
    const { data } = props;
    return (
      <div className="">
        <section className="grid_wrap">
          <div className="grid">
            {data.map((item, index) => (
              <div onClick={() => handelArtical(item.id)} key={index}>
                <CardNew item={item} />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const responseAllData = await axios.get(
        `${API_URL}/search?section=news&order-by=${sort}&page-size=15&api-key=${API_KEY}&show-fields=all`
      );
      const responseSportData = await axios.get(
        `${API_URL}/search?section=sport&order-by=${sort}&api-key=${API_KEY}&show-fields=all`
      );
      const responseCultureData = await axios.get(
        `${API_URL}/search?section=culture&order-by=${sort}&api-key=${API_KEY}&show-fields=all`
      );
      setLoading(false);
      setAllData(responseAllData.data.response.results);
      setSportData(responseSportData.data.response.results);
      setCultureData(responseCultureData.data.response.results);
    };
    loadNews();
  }, [sort]);

  useEffect(() => {
    if (isFetching) {
      handleSearch(valueSearch);
    }
  }, [isFetching]);

  const SwitchSection = () => {
    switch (theSection) {
      case "topStories":
        return (
          <div className="top-stories-section">
            <PageHeader
              title="Top Stories"
              onClick={() => (setTheSection("bookmark"), setSuggestions([]))}
              bookmarkText="view bookmark"
              onChange={handelChange}
              sort={sort}
            />
            <div className="grid_wrap">
              <div className="grid">
                <section className="grid_wrap first-grid">
                  <div className="grid">
                    {allData?.slice(0, 1).map((item, index) => (
                      <div onClick={() => handelArtical(item.id)} key={index}>
                        <CardNew item={item} showBody={true} />
                      </div>
                    ))}
                  </div>
                </section>
                <section className="grid_wrap second-grid">
                  <div className="grid">
                    {allData?.slice(1, 3).map((item, index) => (
                      <div onClick={() => handelArtical(item.id)} key={index}>
                        <CardNew item={item} />
                      </div>
                    ))}
                    {allData?.slice(3, 5).map((item, index) => (
                      <div onClick={() => handelArtical(item.id)} key={index}>
                        <CardNewText item={item} />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
            <section className="grid_wrap">
              <div className="grid">
                {allData?.slice(-3).map((item, index) => (
                  <div onClick={() => handelArtical(item.id)} key={index}>
                    <CardNew item={item} showBody={true} />
                  </div>
                ))}
              </div>
            </section>
            <section className="grid_wrap">
              <h1>Sports</h1>
              <div className="grid">
                {sportData?.slice(-3).map((item, index) => (
                  <div onClick={() => handelArtical(item.id)} key={index}>
                    <CardNew item={item} />
                  </div>
                ))}
              </div>
            </section>
            <section className="grid_wrap">
              <h1>Culture</h1>
              <div className="grid">
                {cultureData?.slice(-3).map((item, index) => (
                  <div onClick={() => handelArtical(item.id)} key={index}>
                    <CardNew item={item} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case "search":
        return (
          <div className="search-section">
            <PageHeader
              title="Search Result"
              onClick={() => (setTheSection("bookmark"), setSuggestions([]))}
              bookmarkText="view bookmark"
              onChange={handelChange}
              sort={sort}
            />
            <HandleCard data={suggestions} />
          </div>
        );

      case "bookmark":
        return (
          <div className="bookmark-section">
            <PageHeader
              title="All Bookmark"
              onChange={handelChange}
              sort={sort}
            />
            <HandleCard data={bookMarkList} />
          </div>
        );

      case "artical":
        return (
          <Artical
            onClick={handleBookmarkList}
            bookmarkText={bookmarkText}
            articalData={articalData}
            showSnack={showSnack}
            typeSnack={typeSnack}
          />
        );
    }
  };
  return (
    <div className="home-page">
      <Header
        onClick={() => (setTheSection("topStories"), setSuggestions([]))}
        onChange={(e) => optimizedFn(e.target.value)}
      />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="container">
            <div className="page-padding">
              <SwitchSection />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};
export default Home;
