import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CardNew from "../components/CardNew";
import CardNewText from "../components/CardNewText";
import PageHeader from "../components/PageHeader";
import pic from "../assests/images/pic.png";

const Home = () => {
  const [cardInfo, setCardInfo] = useState({
    title:
      "Spike Lee: 'Race relations today are a direct response to having a black president'",
    pic: { pic },
    body: " RaceR ace Ra ceRac eRa ceRac eRaceRac  eRaceRaceRac eRa  ceRaceR aceRaceRac eRac eRaceRace",
  });
  useEffect(() => {
    fetch(`https://content.guardianapis.com/sections?q=news&api-key=e5ad68ae-4b0d-45b1-8681-6c7120d0df5e`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => console.log(actualData))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="home-page">
      <Header />

      <div className="container">
        <div className="page-padding">
          <PageHeader title="Top stories" />
          {/* <CardNew cardInfo={cardInfo} /> */}
          {/* <CardNewText cardInfo={cardInfo} /> */}
          <div class="home-content ">
            <section className="one-grid">
              <div class="one style1">
                <CardNew cardInfo={cardInfo} />
              </div>
              <div class="two style2">
                <CardNew cardInfo={cardInfo} />
              </div>
              <div class="three style2">
                <CardNew cardInfo={cardInfo} />
              </div>
              <div class="four style2">
                <CardNewText cardInfo={cardInfo} />
              </div>
              <div class="five style2">
                <CardNewText cardInfo={cardInfo} />
              </div>
            </section>
            <section className="second-grid">
              <div class="one">
                <CardNew cardInfo={cardInfo} />
              </div>
              <div class="one">
                <CardNew cardInfo={cardInfo} />
              </div>
              <div class="one">
                <CardNew cardInfo={cardInfo} />
              </div>
            </section>
            <section className="news-section">
              <h1>sports</h1>
              <div className="second-grid">
                <div class="one">
                  <CardNew cardInfo={cardInfo} />
                </div>
                <div class="one">
                  <CardNew cardInfo={cardInfo} />
                </div>
                <div class="one">
                  <CardNew cardInfo={cardInfo} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
