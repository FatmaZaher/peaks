import React, { useEffect, useState, useContext } from "react";
import CardNew from "../components/CardNew";
import CardNewText from "../components/CardNewText";
import PageHeader from "../components/PageHeader";
import { GlobalContext } from "../contexts/BookContext";
import Loading from "../components/Loading";
import { getHomeNews } from "../api/home.api";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [sportData, setSportData] = useState([]);
  const [cultureData, setCultureData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setorderBy] = useState("newest");
  const { setActivePage } = useContext(GlobalContext);
  const handelChange = (e) => {
    setorderBy(e.target.value);
  };
  useEffect(() => {
    (async () => {
      Promise.all([
        await getHomeNews({ orderBy: orderBy }),
        await getHomeNews({
          orderBy: orderBy,
          section: ["sport"],
          pageSize: 3
        }),
        await getHomeNews({
          orderBy: orderBy,
          section: ["culture"],
          pageSize: 3
        }),
      ])
        .then((values) => {
          setLoading(false);
          setAllData(values[0].data.response.results);
          setSportData(values[1].data.response.results);
          setCultureData(values[2].data.response.results);
        })
        .catch(() => ({
          errorMessage: "Something went wrong",
        }));
    })();
  }, [orderBy]);

  return (
    <div className="top-stories-section">
      <PageHeader
        title="Top Stories"
        onClick={() => setActivePage("bookmark")}
        bookmarkText="view bookmark"
        onChange={handelChange}
        orderBy={orderBy}

      />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="grid_wrap">
            <div className="grid">
              <section className="grid_wrap first-grid">
                <div className="grid">
                  {allData?.slice(0, 1).map((item, index) => (
                    <CardNew item={item} showBody={true} key={index} />
                  ))}
                </div>
              </section>
              <section className="grid_wrap second-grid">
                <div className="grid">
                  {allData?.slice(1, 3).map((item, index) => (
                    <CardNew item={item} key={index} />
                  ))}
                  {allData?.slice(3, 5).map((item, index) => (
                    <CardNewText item={item} key={index} />
                  ))}
                </div>
              </section>
            </div>
          </div>
          <section className="grid_wrap">
            <div className="grid">
              {allData?.map((item, index) => (
                <CardNew item={item} showBody={true} key={index} />
              ))}
            </div>
          </section>
        </div>
      )}

      <section className="grid_wrap">
        <h1>Sports</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid">
            {sportData?.map((item, index) => (
              <CardNew item={item} key={index} />
            ))}
          </div>
        )}
      </section>

      <section className="grid_wrap">
        <h1>Culture</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid">
            {cultureData?.slice(-3).map((item, index) => (
              <CardNew item={item} key={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
export default Home;
