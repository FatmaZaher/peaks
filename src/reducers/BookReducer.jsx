// import React from "react";
// const BookReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_BOOK":
//       return [
//         ...state,
//         {
//           title: action.book.title,
//         },
//       ];
//     case "REMOVE_BOOK":
//       return state.filter((book) => book.id !== action.id);
//     default:
//       return state;
//   }
// };
// export default BookReducer;
import React from "react";

const BookReducer = (state, action) => {
  switch (action.type) {

    case "ADD_BOOK":
 console.log(action);
      return [
        ...state,
        {
          artical: action.artical,
        },
        
      ];
    case "REMOVE_BOOK":
      console.log(action.id);
      return state.filter((artical)=> artical.artical.id !== action.artical.artical.id);
    default:
      return state;
  }
};
export default BookReducer;
