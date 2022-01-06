import React from "react";
import { APP_NAME, USER_NOT_FOUND } from "../App.js";

export default function Navbar({ searchInput, handleSearchChange, searchResult, handleSearchResultClick}) {
  //
  return (
    <div className="navbar mt-5 p-3">
      <p>{APP_NAME}</p>
      <input type="text" title="search box" value={searchInput} onChange={handleSearchChange} onKeyPress={handleSearchResultClick}/>
      <i className="bi bi-search"></i>
      { searchResult ? <button onClick={handleSearchResultClick}>{searchResult.name}</button> : ""}
      {/* TODO if no user is found and search field is focused, then show USER_NOT_FOUND message */}
    </div>
  );
}
