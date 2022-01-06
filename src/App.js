import "./App.css";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Souls from "../build/contracts/Souls.json";
import { useEffect, useRef, useState } from "react";
import Web3 from "web3";

export const APP_NAME = "Vertex";
export const USER_NOT_FOUND = "Uh Oh! No such user exists.";
export const APP_DESCRIPTION =
  APP_NAME +
  " Let's you collate all your social media handles and crypto addresses under one identity. Start by creating your own identity below.";

function App() {
  const contractInstanceRef = useRef(null);
  const web3Ref = useRef(null);

  const [navbarSearchInput, setNavbarSearchInput] = useState(""); // used in Navbar
  const [navbarSearchResult, setNavbarSearchResult] = useState("");

  const [homepageSearchInput, setHomepageSearchInput] = useState(""); // used in Homepage
  const [homepageSearchResult, setHomepageSearchResult] = useState("");

  /*
  const getUserWithUsername = async (username) => {
    return await contractInstanceRef.current.methods
      .users(web3Ref.current.utils.asciiToHex(username))
      .call();
  };
  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);
    const userFound = await contractInstanceRef.current.methods
      .users(web3Ref.current.utils.asciiToHex(e.target.value))
      .call();
    if (userFound.isActive) {
      setSearchResult(userFound);
    } else {
      setSearchResult("");
    }
  };
  const handleUsernameChange = async (e) => {
    setUsernameInput(e.target.value);
    const userFound = getUserWithUsername(e.target.value);
    if (userFound.isActive) {
      setUsernameSearchResult(userFound);
    } else {
      setUsernameSearchResult("");
    }
  };
  */

  const handleSearchChange = async (e, component) => {
    let setInput;
    let setResult;
    switch (component) {
      case "HOMEPAGE":
        setInput = setHomepageSearchInput;
        setResult = setHomepageSearchResult;
        break;
      case "NAVBAR":
        setInput = setNavbarSearchInput;
        setResult = setNavbarSearchResult;
        break;
      default:
    }
    setInput(e.target.value);
    const userFound = await contractInstanceRef.current.methods
      .users(web3Ref.current.utils.asciiToHex(e.target.value))
      .call();
    setResult(userFound.isActive ? userFound : "");
    console.log('user found:', userFound);
  };

  const handleSearchResultClick = () => {
    // TODO: open the search result user when Enter key is pressed or mouse click is made,
    // update url with the username as path parameter
  };

  useEffect(() => {
    (async () => {
      web3Ref.current = new Web3(Web3.givenProvider || "http://localhost:7545");
      // console.log('web3 instance', web3);

      let soulsContract = new web3Ref.current.eth.Contract(
        Souls.abi,
        "0x108aa63F14aF40f13C8c9A6753226163AaA26Bd7"
      );
      contractInstanceRef.current = soulsContract;
      console.log("contract instance", contractInstanceRef.current);
    })();
    // TODO opening this page with the username specified as path parameter then try to open that user profile or else show error.
    // TODO show error if metamask is not present
  }, []);

  return (
    <div className="App">
      <Navbar
        searchInput={navbarSearchInput}
        handleSearchChange={(e) => handleSearchChange(e, "NAVBAR")}
        searchResult={navbarSearchResult}
      ></Navbar>
      <Homepage
        searchInput={homepageSearchInput}
        handleSearchChange={(e) => handleSearchChange(e, "HOMEPAGE")}
        searchResult={homepageSearchResult}
      ></Homepage>
    </div>
  );
}

export default App;
