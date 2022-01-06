import React from "react";
import { APP_NAME, APP_DESCRIPTION } from "../App.js";

const USERNAME_PREEXISTS = "Username already exists! try something different.";

export default function Homepage({
  searchInput,
  handleSearchChange,
  searchResult,
}) {
  const USERNAME_CLASS =
    searchResult && searchResult.isActive
      ? "usernameBad"
      : "usernameGood";

  return (
    <div>
      <h1>{APP_NAME}</h1>
      <p>{APP_DESCRIPTION}</p>
      <input
        type="text"
        title="username"
        value={searchInput}
        onChange={handleSearchChange}
        className="USERNAME_CLASS"
      />
      <p className="usernameError">
        {searchResult &&
          searchResult.isActive &&
          USERNAME_PREEXISTS}
      </p>
      {searchResult && searchResult.name}
      {/* TODO convert username to ascii */}
      {/* TODO if username does not exist then clicking enter 
        shows a form to enter Name and connect metamask
       should allow to connect metamask */}
    </div>
  );
}
