import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import CardNew from "../components/CardNew";
import Button from "../components/Button";
import Select from "../components/Select";
import logo from "../assests/images/logo.png";
import Search from "../components/icons/Search";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import Artical from "../components/Artical";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [sportData, setSportData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setsort] = useState("newest");
  const [searchValue, setSearchValue] = useState("");
  const [articalData, setArticalData] = useState();
  const [showTopStories, setShowTopStories] = useState(true);
  const [showSearch, setshowSearch] = useState(false);
  const [showBookMark, setShowBookMark] = useState(false);
  const [showArtical, setShowArtical] = useState(false);

  const [bookmarkText, setBookmarkText] = useState("add bookmark");

  const API_URL = "https://content.guardianapis.com";
  const API_KEY = "7b979b22-ab7e-4d58-b00a-8c747f8fc795";

  const showSearchSection = () => {
    if (searchValue) {
      setShowTopStories(false);
      setShowBookMark(false);
      setShowArtical(false);
      setshowSearch(true);
    } else {
      setShowTopStories(true);
    }
  };
  const showTopSection = () => {
    setShowTopStories(true);
    setshowSearch(false);
    setShowBookMark(false);
    setShowArtical(false);

    setSearchValue("");
  };
  const showBookMarkSection = () => {
    setShowTopStories(false);
    setshowSearch(false);
    setShowBookMark(true);
    setShowArtical(false);
  };
  const handelArtical = async (item) => {
    setLoading(true);
    const responseArticalData = await axios.get(
      `${API_URL}/search?ids=${item}&api-key=${API_KEY}&show-fields=all`
    );
    setArticalData(responseArticalData.data.response.results[0]);
    setShowTopStories(false);
    setShowBookMark(false);
    setshowSearch(false);
    setShowArtical(true);
    setLoading(false);
  };
  const handelChange = (e) => {
    setsort(e.target.value);
  };
  const addToBookmarkList = () => {
    setBookmarkText("remove bookmark");

  };

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const responseAllData = await axios.get(
        `${API_URL}/search?order-by=${sort}&q=${searchValue}&api-key=${API_KEY}&show-fields=all`
      );
      const responseSportData = await axios.get(
        `${API_URL}/search?section=sport&order-by=${sort}&api-key=${API_KEY}&show-fields=all`
      );

      setAllData(responseAllData.data.response.results);
      setSportData(responseSportData.data.response.results);

      showSearchSection();
      setLoading(false);
    };
    loadNews();
  }, [searchValue, sort]);

  console.log("data", allData);
  console.log("searchValue", searchValue);
  console.log("sport", sportData);
  console.log("sortValue", sort);
  console.log("showBookMark", showBookMark);
  console.log("bookmarkText", bookmarkText);
  console.log("articalxxxxxxxxxxxxxxxxxxxId", articalData);

  return (
    <div className="home-page">
      {/* Header of the page include logo (onclick back to the top stories section home page*) and search box  */}
      <Header
        onClick={showTopSection}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="container">
        {/* loading before fetch rendering  */}
        {loading ? (
          <Loading />
        ) : (
          <div className="page-padding">
            {showTopStories && (
              <div className="top-stories-section">
                <PageHeader
                  title="Top Stories"
                  onClick={showBookMarkSection}
                  bookmarkText="view bookmark"
                  onChange={handelChange}
                  sort={sort}
                />
                <section className="one-grid">
                  {allData?.slice(0, 5).map((item, index) => (
                    <div onClick={() => handelArtical(item.id)}>
                      <CardNew item={item} index={index} />
                    </div>
                  ))}
                  {/* <div className="one style1">
                <CardNew cardInfo={cardInfo} />
              </div>
              <div className="two style2">
                <CardNew cardInfo={cardInfo} />
              </div>
              <div className="three style2">
                <CardNew cardInfo={cardInfo} />
              </div>
              <div className="four style2">
                <CardNewText cardInfo={cardInfo} />
              </div>
              <div className="five style2">
                <CardNewText cardInfo={cardInfo} />
              </div> */}
                </section>
                <section className="second-grid">
                  {allData?.slice(5, 8).map((item, index) => (
                    <div onClick={() => handelArtical(item.id)}>
                      <CardNew item={item} index={index} />
                    </div>
                  ))}
                  {/* <div className="one">
                <CardNew cardInfo={cardInfo} />
              </div>
              <div className="one">
                <CardNew cardInfo={cardInfo} />
              </div>
              <div className="one">
                <CardNew cardInfo={cardInfo} />
              </div> */}
                </section>
                <section className="news-section">
                  <h1>sports</h1>
                  <div className="second-grid">
                    {sportData?.slice(0, 3).map((item, index) => (
                      <div onClick={() => handelArtical(item.id)}>
                        <CardNew item={item} index={index} hideBody={true} />
                      </div>
                    ))}
                  </div>

                  {/* 
              <div className="second-grid">
                <div className="one">
                  <CardNew cardInfo={cardInfo} />
                </div>
                <div className="one">
                  <CardNew cardInfo={cardInfo} />
                </div>
                <div className="one">
                  <CardNew cardInfo={cardInfo} />
                </div>
              </div> */}
                </section>
              </div>
            )}
            {showSearch && (
              <div className="search-section">
                <PageHeader
                  title="Search Result"
                  onClick={showBookMarkSection}
                  bookmarkText="view bookmark"
                  onChange={handelChange}
                  sort={sort}
                />
                <section className="second-grid">
                  {allData?.map((item, index) => (
                    <div onClick={() => handelArtical(item.id)}>
                      <CardNew item={item} index={index} />
                    </div>
                  ))}
                </section>
              </div>
            )}
            {showBookMark && (
              <div className="bookmark-section">
                <PageHeader
                  title="All Bookmark"
                  onChange={handelChange}
                  sort={sort}
                />
                <section className="second-grid">
                  {allData?.map((item, index) => (
                      <CardNew item={item} index={index} onClick={() => handelArtical(item.id)}/>
  
                  ))}
                </section>
              </div>
            )}
            {showArtical && (
              <Artical
                onClick={addToBookmarkList}
                bookmarkText={bookmarkText}
                articalData={articalData}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
