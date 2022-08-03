import { createContext, useReducer, useEffect } from "react";
import bookMarkReducer from "../reducers/BookReducer";

const initialState = {
  bookList: localStorage.getItem("booklist")
    ? JSON.parse(localStorage.getItem("booklist"))
    : [],
  articalId: "",
  activePage: "home",
  searchValue: ''
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(bookMarkReducer, initialState);
  useEffect(() => {
    localStorage.setItem("booklist", JSON.stringify(state.bookList));
  }, [state]);
  const addArticleToBookList = (article) => {
    dispatch({ type: "ADD", payload: article });
  };
  const removeArticleFromBookList = (id) => {
    dispatch({ type: "Remove", payload: id });
  };
  const setArticalId = (id) => {
    dispatch({ type: "setArticalId", payload: id });
  };
  const setActivePage = (section) => {
    dispatch({ type: "setActivePage", payload: section });
  };
  const setSearchValue = (value) => {
    dispatch({ type: "setSearchValue", payload: value });
  };
  return (
    <GlobalContext.Provider
      value={{
        bookMarkList: state.bookList,
        articalId: state.articalId,
        activePage: state.activePage,
        searchValue: state.searchValue,
        addArticleToBookList,
        removeArticleFromBookList,
        setArticalId,
        setActivePage,
        setSearchValue
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
