import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import CardNew from "../components/CardNew";
import CardNewText from "../components/CardNewText";
import Button from "../components/Button";
import Select from "../components/Select";
import logo from "../assests/images/logo.png";
import Search from "../components/icons/Search";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import Artical from "../components/Artical";

import { BookContext } from "../contexts/BookContext";

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
  const [bookMarkList, setBookMarkList] = useState([]);

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

  const { dispatch, articals } = useContext(BookContext);

  const addToBookmarkList = () => {
    setBookmarkText("remove bookmark");
    // setBookMarkList([...bookMarkList, articalData]);
    // dispatch({ type: "ADD_BOOK", artical: articalData });

    // setBookMarkList(articals);

   
    dispatch({ type: "REMOVE_BOOK", id: articalData.id });

    // bookMarkList?.map((item) => {
    //   if (item.id == articalData.id) {
    //   } else {
    //   }
    // });
    // bookMarkList.push('sdfdfdf')
  };
  const remove = () => {
  }

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const responseAllData = await axios.get(
        `${API_URL}/search?section=news&order-by=${sort}&page-size=15&q=${searchValue}&api-key=${API_KEY}&show-fields=all`
      );
      const responseSportData = await axios.get(
        `${API_URL}/search?section=sport&order-by=${sort}&api-key=${API_KEY}&show-fields=all`
      );

      setAllData(responseAllData.data.response.results);
      setSportData(responseSportData.data.response.results);

      setBookMarkList(articals);

      showSearchSection();
      setLoading(false);
    };
    loadNews();
  }, [searchValue, sort, articals]);

  console.log("data", allData);
  // console.log("searchValue", searchValue);
  // console.log("sport", sportData);
  // console.log("sortValue", sort);
  // console.log("showBookMark", showBookMark);
  // console.log("bookmarkText", bookmarkText);
  console.log("articalxxxxxxxxxxxxxxxxxxxId", articalData);
  // console.log("bookMarkList", bookMarkList);
  console.log("bookMarkList", bookMarkList);

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
                <div className="grid_wrap">
                  <div className="grid">
                    <section className="grid_wrap first-grid">
                      <div className="grid">
                        {allData?.slice(0, 1).map((item, index) => (
                          <div onClick={() => handelArtical(item.id)}>
                            <CardNew
                              item={item}
                              index={index}
                              showBody={true}
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                    <section className="grid_wrap second-grid">
                      <div className="grid">
                        {allData?.slice(1, 3).map((item, index) => (
                          <div onClick={() => handelArtical(item.id)}>
                            <CardNew item={item} index={index} />
                          </div>
                        ))}
                        {allData?.slice(3, 5).map((item, index) => (
                          <div onClick={() => handelArtical(item.id)}>
                            <CardNewText item={item} index={index} />
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
                <section className="grid_wrap">
                  <div className="grid">
                    {allData?.slice(-3).map((item, index) => (
                      <div onClick={() => handelArtical(item.id)}>
                        <CardNew item={item} index={index} showBody={true} />
                      </div>
                    ))}
                  </div>
                </section>
                <section className="grid_wrap">
                  <h1>sports</h1>
                  <div className="grid">
                    {sportData?.slice(-3).map((item, index) => (
                      <div onClick={() => handelArtical(item.id)}>
                        <CardNew item={item} index={index} />
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
                <section className="grid_wrap">
                  <div className="grid">
                    {allData?.map((item, index) => (
                      <div onClick={() => handelArtical(item.id)}>
                        <CardNew item={item} index={index} />
                      </div>
                    ))}
                  </div>
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
                <section className="grid_wrap">
                  {/*  */}
                  <div className="grid">
                    {bookMarkList?.map((item, index) => (
                      <CardNew
                        item={item.artical}
                        index={index}
                        onClick={() => handelArtical(item.artical.id)}
                      />
                    ))}
                  </div>
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
