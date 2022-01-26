import React, { useState } from "react";
import {
  APP_NAME,
  APP_DESCRIPTION,
  searchUser,
  contractInstance,
  web3,
  account,
} from "../App.js";
import { useNavigate } from "react-router-dom";

const USERNAME_PREEXISTS = "Username already exists! try something different.";

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    setUsername(e.target.value);
    let ss = await searchUser(e.target.value);
    console.log(ss);
    setSearchResult(ss);
  };

  const handleHomepageNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCreateAccount = async () => {
    contractInstance.methods
      .createUser(web3.utils.asciiToHex(username), web3.utils.asciiToHex(name))
      .send({ from: account });
    // TODO 2 if creation is succesful then only route to profile page
    const e = contractInstance.events
      .UserCreatedEvent({})
      .on("data", async (event) => {
        console.log('user created', event.returnValues);
        // TODO 2 show user created notification
        navigate("/" + username);
      })
      .on("error", console.error);
      console.log('event listener', e);
    // navigate("/" + username);
  };

  return (
    <div>
      <h1>{APP_NAME}</h1>
      <p>{APP_DESCRIPTION}</p>
      Search:
      <input
        type="text"
        title="username"
        value={username}
        onChange={handleSearchChange}
      />
      {searchResult && !searchResult.isActive && username && (
        <>
          <br />
          Name:
          <input
            title="name"
            value={name}
            onChange={handleHomepageNameChange}
          ></input>
          <br />
          <button onClick={handleCreateAccount}>Create Account</button>
        </>
      )}
    </div>
  );
}
