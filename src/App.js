
import './App.scss';
import React, { useContext } from "react";

import { GlobalProvider, GlobalContext } from './contexts/BookContext';
import Home from "./pages/Home"
import Search from "./pages/Search"
import Bookmark from "./pages/Bookmark"
import Artical from "./pages/Artical"
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Header />
        <Content />
        <Footer />
      </GlobalProvider>
    </div>
  );
}
const switchSection = (activePage) => {
  switch (activePage) {
    case "home":
      return <Home />;
    case "search":
      return <Search />;
    case "bookmark":
      return <Bookmark />;
    case "artical":
      return <Artical />;
    default:
      return <Home />
  }
};
function Content() {
  const { activePage } = useContext(GlobalContext);
  return (
    <div className="container">
      <div className="page-padding">
        {switchSection(activePage)}
      </div>
    </div>

  )
}

export default App;
