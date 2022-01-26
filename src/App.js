import "./App.css";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Souls from "../build/contracts/Souls.json";
import Web3 from "web3";
import {BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom";
import Profile from "./components/Profile";

export const APP_NAME = "Vertex";
export const USER_NOT_FOUND = "Uh Oh! No such user exists.";
export const APP_DESCRIPTION =
  APP_NAME +
  " Let's you collate all your social media handles and crypto addresses under one identity. Start by creating your own identity below.";

export let web3;
export let contractInstance;
export let account;
(async () => {
  web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  contractInstance = new web3.eth.Contract(
    Souls.abi,
    "0x6c44434F5db9e5116938C29E86085dc6b1BEb673"
  );
  await window.ethereum.enable(); // connect to metamask
  const accounts = await web3.eth.getAccounts();
  account = accounts[0];
  console.log('account', account);
  console.log("contract instance", contractInstance);
})();

export const searchUser = async (searchInput) => {
  // this function is shared between Homepage and Navbar components
  // TODO 2 if input contains space then prevent the search
  return await contractInstance.methods
    .users(web3.utils.asciiToHex(searchInput))
    .call();
}

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route path="/" exact element={<Homepage />}/>
          <Route path="/:username" element={<Profile />}/>
        </Routes>
      </Router>
      <Outlet/>
    </div>
  );
}

export default App;
