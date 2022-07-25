import React, { createContext, useReducer, useEffect } from "react";
import BookReducer from "../reducers/BookReducer";
export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [articals, dispatch] = useReducer(BookReducer, [], () => {
    const localData = localStorage.getItem("articals");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("articals", JSON.stringify(articals));
    
  }, [articals]);
console.log(articals)
  return (
    <BookContext.Provider value={{ articals, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
};
export default BookContextProvider;
