import React, { useState } from "react";
import { APP_NAME, USER_NOT_FOUND, searchUser } from "../App.js";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState();

  const handleSearchResultClick = () => {
    // TODO 1 open the search result user when Enter key is pressed or mouse click is made,
    // TODO 1 update url with the username as path parameter
  };

  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);
    let ss = await searchUser(e.target.value);
    setSearchResult(ss);
  };

  return (
    <div className="navbar mt-5 p-3">
      <p>{APP_NAME}</p>
      <input
        type="text"
        title="search box"
        value={searchInput}
        onChange={handleSearchChange}
        onKeyPress={handleSearchResultClick}
      />
      <i className="bi bi-search"></i>
      {searchResult ? (
        <button onClick={handleSearchResultClick}>Click</button>
      ) : (
        ""
      )}
      {/* TODO 2 if no user is found and search field is focused, then show USER_NOT_FOUND message */}
    </div>
  );
}
