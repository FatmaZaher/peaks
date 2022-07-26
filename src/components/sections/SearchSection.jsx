// import React from "react";
// import CardNew from "../CardNew";
// import PageHeader from "../PageHeader";

// const SearchSection = (props) => {
//   const { onClick,onChange, sort  , suggestions} = props;

//   return (
//     <div className="search-section">
//       <PageHeader
//         title="Search Result"
//         onClick={onClick}
//         bookmarkText="view bookmark"
//         onChange={onChange}
//         sort={sort}
//       />
//       <section className="grid_wrap">
//         <div className="grid">
//           {suggestions?.map((item, index) => (
//             <div onClick={() => handelArtical(item.id)}>
//               <CardNew item={item} index={index} />
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };
// export default SearchSection;
