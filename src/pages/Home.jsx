import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import CardNew from "../components/CardNew";
import Button from "../components/Button";
import Select from "../components/Select";
import logo from "../assests/images/logo.png";
import Search from "../components/icons/Search";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [sportData, setSportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("newest");
  const [searchValue, setSearchValue] = useState("");
  const [showTopStories, setShowTopStories] = useState(true);
  const [showSearch, setshowSearch] = useState(false);
  const [showBookMark, setShowBookMark] = useState(false);
  const [singleNew, setSingleNew] = useState();
  const [newId, setNewId] = useState("");

  const [bookmarkText, setBookmardText] = useState("Add Bookmark");

  const API_URL = "https://content.guardianapis.com";
  const API_KEY = "7b979b22-ab7e-4d58-b00a-8c747f8fc795";

  const showSearchSection = () => {
    if (searchValue) {
      setShowTopStories(false);
      setShowBookMark(false);
      setshowSearch(true);
    } else {
      setShowTopStories(true);
    }
  };

  const showTopSection = () => {
    setShowTopStories(true);
    setshowSearch(false);
    setSearchValue("");
  };

  const handelChange = (e) => {
    setFilter(e.target.value);
  };

  const showBookMarkSection = () => {
    setShowTopStories(false);
    setshowSearch(false);
    setShowBookMark(true);
  };
  const showSingleNew = (item) => {
    setNewId(item.id);
  };
  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const responseAllData = await axios.get(
        `${API_URL}/search?order-by=${filter}&q=${searchValue}&api-key=${API_KEY}&show-fields=all`
      );
      const responseSportData = await axios.get(
        `${API_URL}/search?section=sport&order-by=${filter}&api-key=${API_KEY}&show-fields=all`
      );
      setAllData(responseAllData.data.response.results);
      setSportData(responseSportData.data.response.results);

      setLoading(false);
      showSearchSection();
    };
    loadNews();
  }, [searchValue, filter]);

  console.log("data", allData);
  console.log("searchValue", searchValue);
  console.log("sport", sportData);
  console.log("filterValue", filter);
  console.log("showBookMark", showBookMark);
  console.log("newId", newId);

  return (
    <div className="home-page">
      <div className="header">
        <div className="container">
          <div className="logo" onClick={showTopSection}>
            <img src={logo} alt="logo" />
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search all news"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div>
              <Search />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <div id="wrapper">
            <div class="profile-main-loader">
              <div class="loader">
                <svg class="circular-loader" viewBox="25 25 50 50">
                  <circle
                    class="loader-path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke="#09357B"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="page-padding">
            {/* <PageHeader title={pageTitle} /> */}
            {showTopStories && (
              <div className="top-stories-section">
                <div className="page-header">
                  <h1 className="title">Top Stories</h1>
                  <div>
                    <Button
                      onClick={showBookMarkSection}
                      bookmarkText={bookmarkText}
                    />
                    <Select onChange={handelChange} filter={filter} />
                  </div>
                </div>
                <section className="one-grid">
                  {allData?.slice(0, 5).map((item, index) => (
                    <div onClick={() => setNewId(item.id)} >
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
                    <CardNew item={item} index={index} />
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
                      <CardNew item={item} index={index} hideBody={true} />
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
                <div className="page-header">
                  <h1 className="title">Search Result</h1>
                  <div>
                    <Button
                      onClick={showBookMarkSection}
                      bookmarkText={bookmarkText}
                    />
                    <Select onChange={handelChange} filter={filter} />
                  </div>
                </div>
                <section className="second-grid">
                  {allData?.map((item, index) => (
                    <CardNew item={item} index={index} />
                  ))}
                </section>
              </div>
            )}
            {showBookMark && (
              <div className="bookmark-section">
                <div className="page-header">
                  <h1 className="title">All Bookmark</h1>
                  <div>
                    <Select onChange={handelChange} filter={filter} />
                  </div>
                </div>
                <section className="second-grid">
                  {allData?.map((item, index) => (
                    <CardNew item={item} index={index} />
                  ))}
                </section>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
